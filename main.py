
# spread the cuteness...

import webapp2
import random
from google.appengine.ext import ndb

class Pictures(ndb.Model):
  picURL = ndb.StringProperty()

class User(ndb.Model):
  number = ndb.StringProperty()

def twiml(message, has_media, media_url):
  if has_media:
    return "<?xml version=\"1.0\" encoding=\"UTF-8\"?><Response><Message>"+message+"<Media>"+str(media_url)+"</Media></Message></Response>"
  else:
    return "<?xml version=\"1.0\" encoding=\"UTF-8\"?><Response><Message>"+message+"</Message></Response>"

def findPictureURL():
  counter = 0
  ndb_pics = Pictures.query()
  rand = random.randint(0, ndb_pics.count()-1)
        
  for pic in ndb_pics:
    if(counter == rand):
      return pic.picURL
    counter += 1
  return "no pic"

class twilioCalling(webapp2.RequestHandler):
    
    def post(self):

      self.response.headers['Content-Type'] = 'text/xml'
      
      sender = str(self.request.get("From"))
      new_user = User.query(User.number == sender).count() == 0
      wants_cute = "#cuteness" in str(self.request.get("Body"))

      if new_user:
        User(number=sender).put()
        self.response.write(twiml("Welcome to the cuteness! Just include #cuteness for a cuter day! Here's your first cuteness! :)", True, findPictureURL()))
      elif wants_cute:
        self.response.write(twiml("Spread the cuteness! :)", True, findPictureURL()))
      else:
        self.response.write(twiml("Thanks for the text! Add #cuteness in your text for some cuteness! :)", False, ""))

class twilioCalling(webapp2.RequestHandler):

  def post(self):
    Pictures(picUrl = self.request.get("pic_url")).put();

application = webapp2.WSGIApplication( [('/rest/twilio', twilioCalling), ('/rest/add', addImage)], debug = True)

