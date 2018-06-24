#! /usr/bin/python

import cgi, cgitb;
cgitb.enable();

print 'Content-type: text/html\n\n'

def go():
    fs = cgi.FieldStorage()
    toAdd = []
    
    newQuestionMap = fs.getvalue('placeAt')[:-1]
    if (fs.getvalue('yesOrNo') == 'yes'):
        newResponseMap = newQuestionMap + "1"
        oldResponseMap = newQuestionMap + "0"
    else:
        newResponseMap = newQuestionMap + "0"
        oldResponseMap = newQuestionMap + "1"
    
    
    straw = open("qa.txt", "rU")
    oldFile = straw.read()
    straw.close()
    
    oldFile = [i.split(",") for i in oldFile.split("\n")]
    
    d = {}
    for i in oldFile:
        d[i[0]] = i[1]
        
    d[oldResponseMap] = d[newQuestionMap]
    d[newQuestionMap] = "Q" + fs.getvalue('newQuestion')
    d[newResponseMap] = "A" + fs.getvalue('newCharacter')
    
    toWrite = []
    for key in d.keys():
        toWrite += [key + "," + d[key]]
    toWrite = '\n'.join(toWrite)
    
    straw = open('qa.txt', 'w+')
    straw.write(toWrite)
    straw.close()
    
    print """
                <html>
                    
                    <head>
                        <title>College Trip Playlist</title>
                        <script type="text/javascript">
                            window.location.replace("index.html");
                        </script>
                        <link href="style.css" type="text/css" rel="stylesheet">
                    </head>
                    
                    <body>
                    </body>
                    
                </html>"""
    
go()