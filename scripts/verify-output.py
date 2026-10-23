"""Check generated pages and internal links without third-party dependencies."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urljoin, urlparse
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1] / 'dist'
ORIGIN = 'https://ziyang-c23.github.io'


class Page(HTMLParser):
    def __init__(self, text):
        super().__init__()
        self.ids, self.refs, self.alternates = set(), [], []
        self.canonical, self.lang, self.title = None, None, False
        self.feed(text)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if 'id' in attrs:
            self.ids.add(attrs['id'])
        if tag == 'html':
            self.lang = attrs.get('lang')
        if tag == 'title':
            self.title = True
        for key in ('href', 'src'):
            if key in attrs:
                self.refs.append(attrs[key])
        if tag == 'img':
            assert 'alt' in attrs, 'Image without alt attribute'
        if tag == 'link' and attrs.get('rel') == 'canonical':
            self.canonical = attrs.get('href')
        if tag == 'link' and attrs.get('rel') == 'alternate':
            self.alternates.append((attrs.get('hreflang'), attrs.get('href')))


def file_for(path):
    path = unquote(path)
    file = ROOT / path.lstrip('/')
    return file / 'index.html' if path.endswith('/') else file


pages = {}
for file in ROOT.rglob('*.html'):
    relative = file.relative_to(ROOT).as_posix()
    route = '/' + relative.removesuffix('index.html') if relative.endswith('index.html') else '/' + relative
    pages[route] = Page(file.read_text())

for route in ('/', '/zh/', '/blogs/', '/zh/blogs/', '/projects/', '/zh/projects/', '/404.html'):
    assert route in pages, f'Missing page: {route}'

for route, page in pages.items():
    assert page.title and page.lang in ('en', 'zh-CN'), f'Missing metadata: {route}'
    assert page.canonical == ORIGIN + route, f'Bad canonical: {route}'
    for ref in page.refs:
        parsed = urlparse(urljoin(ORIGIN + route, ref))
        if parsed.scheme not in ('http', 'https') or parsed.netloc != urlparse(ORIGIN).netloc:
            continue
        target = file_for(parsed.path)
        assert target.is_file(), f'Broken internal reference: {route} -> {ref}'
        if parsed.fragment and parsed.path in pages:
            assert unquote(parsed.fragment) in pages[parsed.path].ids, f'Broken anchor: {route} -> {ref}'
    for lang, url in page.alternates:
        other = pages.get(urlparse(url).path)
        assert other, f'Missing translation: {route} -> {url}'
        assert lang == 'x-default' or other.lang == lang, f'Wrong translation language: {url}'
        assert any(link == ORIGIN + route for _, link in other.alternates), f'Translation not reciprocal: {route}'

assert (ROOT / 'sitemap-index.xml').is_file(), 'Missing sitemap index'
for xml in ROOT.glob('sitemap-*.xml'):
    tree = ET.parse(xml)
    for node in tree.iter('{http://www.sitemaps.org/schemas/sitemap/0.9}loc'):
        path = urlparse(node.text).path
        assert file_for(path).is_file(), f'Bad sitemap URL: {node.text}'
        assert '404' not in path, '404 page included in sitemap'

for file in ROOT.rglob('*'):
    if file.is_file():
        assert file.suffix not in ('.md', '.tex', '.py', '.ts'), f'Source file leaked to output: {file}'

print(f'PASS: {len(pages)} pages; metadata, reciprocal translations, local links, assets and sitemap.')
