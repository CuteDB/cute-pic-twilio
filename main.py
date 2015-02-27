
# spread the cuteness...
import webapp2
import random
from google.appengine.ext import ndb

class Pictures(ndb.Model):
  picURL = ndb.StringProperty()

class getPic(webapp2.RequestHandler):
    def post(self):
        counter = 0
        ndb_pics = Pictures.query()
        rand = random.randint(0, ndb_pics.count()-1)
        
        for pic in ndb_pics:
          if(counter == rand):
            self.response.headers['Content-Type'] = 'text/xml'
            #self.response.write(twiml(pic.picURL))
            self.response.write(self.request.get('content'))
            break
          counter += 1

ROUTES = [webapp2.Route('/getPic', getPic, handler_method='POST')]

application = webapp2.WSGIApplication(ROUTES, debug = True)