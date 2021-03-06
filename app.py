import markdown
from flask_flatpages import FlatPages
from flask import Flask, render_template
from datetime import datetime
from markdown_it import MarkdownIt
from mdit_py_plugins.front_matter import front_matter_plugin
from mdit_py_plugins.footnote import footnote_plugin
from mdit_py_plugins.texmath import texmath_plugin
from mdit_py_plugins.tasklists import tasklists_plugin
import re
from covid import get_covid_info

DEBUG = True
FLATPAGES_AUTO_RELOAD = DEBUG
FLATPAGES_EXTENSION = '.md'
FLATPAGES_ROOT = ''
POST_DIR = 'posts'

app = Flask(__name__)
app.config.from_object(__name__)
flatpages = FlatPages(app)

md = (
	MarkdownIt("commonmark", {"breaks": True})
	.use(front_matter_plugin)
	.use(footnote_plugin)
	.use(texmath_plugin)
	.use(tasklists_plugin)
	.disable('image')
	.enable('table')
)

def get_posts():
	posts = [p for p in flatpages if p.path.startswith('posts')]
	posts = [p for p in posts if "tags" in p.meta.keys() and p.meta["tags"] and "ignore" not in p.meta["tags"]]
	return posts

def get_categories():
	categories = set()
	for p in flatpages:
		if p.path.startswith('posts'):
			print(p.path)
			m = re.search('/[^/]+/', p.path)
			if m:
				m = m.group(0).strip('/')
				categories.add(m)
	return categories


@app.route("/blog")
def blog():
	posts = get_posts()
	posts.sort(key=lambda item:datetime.strptime(item['date'], "%B %d, %Y"), reverse=True)
	return render_template("blog.html", posts=posts)

@app.route("/category")
def category():
	categories = get_categories()
	return render_template("category.html", categories=categories)

@app.route("/blog/t/<tag>")
def blog_tag(tag):
	posts = get_posts()
	posts = [p for p in posts if "tags" in p.meta.keys() and tag in p.meta["tags"]]
	posts.sort(key=lambda item:datetime.strptime(item['date'], "%B %d, %Y"), reverse=True)
	return render_template("blog.html", posts=posts)

@app.route("/blog/<path:path>")
def blog_post(path):
	post = flatpages.get_or_404(path)
	return render_template('post.html', post=post)

@app.route("/1922")
def covid():
	covid_info = get_covid_info()
	return render_template('1922.html', update_date=covid_info["date"], covid_case=covid_info["case"])
	
@app.route("/about")
def about():
	return render_template('about.html')

@app.template_filter('markdown')
def reverse_filter(s):
    return md.render(s)
