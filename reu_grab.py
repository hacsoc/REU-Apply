import urllib2

resp = urllib2.urlopen('http://www.nsf.gov/crssprgm/reu/list_result.jsp?6578706f7274=1&d-49653-e=3')
xml = resp.read()

out = open('reu_info.xml', 'w')
out.write(xml)
