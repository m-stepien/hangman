from flask import Flask, url_for, render_template, request
import random
import sqlite3
app = Flask(__name__)
@app.route("/")
def begin():
	db=sqlite3.connect('word')
	cur=db.cursor()
	category=['All']
	for e in cur.execute("SELECT DISTINCT category FROM words"):
		category.append(e[0].capitalize())
	db.close()
	return render_template('start.html', category=category);
@app.route('/game', methods=['POST'])
def game():
	if request.method == 'POST':
		option={'category':request.form['category'].lower(),'level':request.form['level'].lower()}
		for opt in option.keys():
			if option[opt]=='all':
				option[opt] = random_choice(opt)
		db=sqlite3.connect('word')
		cur=db.cursor()
		cur.execute("SELECT word FROM words WHERE category=\'"+option['category']+"\'AND level=\'"+option['level']+"\' ORDER BY RANDOM() LIMIT 1;")
		chars=cur.fetchone()[0]
		db.close()
		return render_template('index.html', chars=chars, cate=option['category'], lvl=option['level'])

def random_choice(cl):
	db=sqlite3.connect('word')
	cur = db.cursor()
	columnSQL = cur.execute("SELECT "+cl+" FROM words")
	list_column =[]
	for column in columnSQL:
		list_column.append(column[0])
	return list_column[random.randint(0, len(list_column)-1)]
