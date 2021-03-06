const ObjectID = require('mongodb').ObjectID

const addNews = (db, profilId, notification) => {
  return new Promise((resolve, reject) => {
    const Profils = db.collection('profils')
    Profils.findOneAndUpdate(
      {_id: ObjectID(profilId)},
      {$push: {'history.news': notification}},
      (err, data) => {
        if (err) return reject(err)
        return resolve(data.ops)
      }
    )
  })
}

const getNews = (db, profilId, newsId) => {
  return new Promise((resolve, reject) => {
    const Profils = db.collection('profils')
    Profils.findOne(
      {_id: ObjectID(profilId), 'history.news._id': ObjectID(newsId)},
      {'history.news.$': 1},
      (err, news) => {
        if (err) return reject(err)
        if (!news) return resolve()
        return resolve(news.history.news[0])
      }
    )
  })
}

const getAllNews = (db, profilId) => {
  return new Promise((resolve, reject) => {
    const Profils = db.collection('profils')
    Profils.findOne(
      {_id: ObjectID(profilId)},
      {'history.news': 1},
      (err, news) => {
        if (err) return reject(err)
        if (!news) return resolve()
        return resolve(news.history.news)
      }
    )
  })
}

const extractNews = (db, profilId, newsId) => {
  return new Promise((resolve, reject) => {
    getNews(db, profilId, newsId).then((news) => {
      const Profils = db.collection('profils')
      Profils.updateOne(
        {_id: ObjectID(profilId)},
        {$pull: {'history.news': {_id: ObjectID(newsId)}}},
        (err, data) => {
          if (err) return reject(err)
          return resolve(news)
        }
      )
    }).catch(reject)
  })
}

const addArchive = (db, profilId, notification) => {
  return new Promise((resolve, reject) => {
    const Profils = db.collection('profils')
    Profils.findOneAndUpdate({_id: ObjectID(profilId)}, { $push: { 'history.archived': notification } }, (err, data) => {
      if (err) return reject(err)
      return resolve(data.ops)
    })
  })
}

const archiveNews = (db, profilId, newsId) => {
  return extractNews(db, profilId, newsId)
  .then((notification) => {
    return addArchive(db, profilId, notification)
  })
  .catch(err => err)
}

module.exports = {
  archiveNews,
  addNews,
  addArchive,
  getAllNews
}
