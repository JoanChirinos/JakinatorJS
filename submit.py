#! /usr/bin/python

import cgi, cgitb;
cgitb.enable();

print 'Content-type: text/html\n\n'

def go():
    fs = cgi.fieldStorage()
    for s in fs.keys():
        print s + ': ' + fs.getvalue(s);
        
go()