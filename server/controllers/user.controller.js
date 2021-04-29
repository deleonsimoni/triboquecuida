const bcrypt = require('bcrypt');
const Joi = require('joi');
const User = require('../models/user.model');
const Necessidades = require('../models/necessidades.model');

const config = require('../config/config');


module.exports = {
  insert,
  callHelp,
  markHelp,

}

async function insert(user) {
  user.hashedPassword = bcrypt.hashSync(user.password, 10);
  delete user.password;
  return await new User(user).save();
}


async function callHelp(user, data) {

  let necessidadesId = [];
  let necessidadeAux = '';
  let categories = [];

  for (var i = 0; i < data.necessidades.length; i++) {

    categories.push(data.necessidades[i].categoria);

    necessidadeAux = await Necessidades.find({
      produto: data.necessidades[i].produto.toLowerCase()
    }).select('_id');

    if (necessidadeAux.length) {
      necessidadesId.push(necessidadeAux[0]);
    } else {
      necessidadeAux = await new Necessidades(data.necessidades[i]).save();
      necessidadesId.push(necessidadeAux);
    }
  }
  /*
    await User.findOneAndUpdate({
      _id: user._id,
      help: {
        $exists: true,
        $ne: []
      }
    }, {
      $set: {
        'help.$.isValid': false
      }
    }, {
      new: true
    })
  */
  await User.findById(user._id).then(function (doc) {
    doc.help.forEach(function (help) {
      help.isValid = false;
    });
    doc.save(doc);
  });

  data.necessidades = necessidadesId;
  data.categories = categories;
  return await User.findByIdAndUpdate(user._id, {
    $push: {
      help: data
    }
  }, {
    new: true
  })

}

async function markHelp(user, helpId) {
  return await User.findOneAndUpdate({
    _id: user._id,
    'help._id': helpId
  }, {
    $inc: {
      'help.qtdHelp': 1
    }
  });
}
