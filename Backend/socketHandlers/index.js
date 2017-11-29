let mongoose = require('mongoose');
let User = mongoose.model('User');
let Chat = mongoose.model('Chat');
let Message = mongoose.model('Message');
let DeliveryJob = mongoose.model('DeliveryJob');

exports = module.exports = function(io){
    io.sockets.on('connection', function(socket){
    console.log(socket.id);
    socket.removeAllListeners()
  
    socket.on('JOIN_SELF_GROUP', function(data){
        User.findOne({username: data.user.username}).then(function(user){
            user.isRequesting = false;
            user.save();
        })
        console.log('JOINAM', data.user.username);
        socket.join(data.user.username);
        io.in('driver').emit('TEST');
    });
  
    socket.on('JOIN_DRIVER_GROUP', function(){
      socket.join('drivers');
    });
  
    socket.on('JOIN_CHATROOM', function(data){
        socket.join(data.name);
    });
  
    socket.on('LEAVE_CHATROOM', function(data){
        socket.leave(data.name);
    })
  
    socket.on('NEAR_DRIVERS', function(data){
        User.findOne({username: data.user.username}).then(function(user){
            User.geoNear(
                {type: 'Point', coordinates: [parseFloat(user.geometry.coordinates[0]), parseFloat(user.geometry.coordinates[1])]},
                {maxDistance: 5000000000, spherical: true}
            ).then(function(users){
                let drivers = users.filter(function(user){
                    if(user.obj.deliveryMode){
                        return {profile: user.obj.toProfileJSONFor(), distance: user.dis};
                    }
  
                });
                io.emit('NEAR_DRIVERS', {
                    profiles: drivers
                })
            });
        });
    });

    socket.on('COMEPLETE_DELIVERY', function(data){
        User.findOne({username: data.client.username}).then(function(user){
            io.in(user.username).emit('RECEIVE_COMPLETE_DELIVERY');
        })
    });

    socket.on('CONFIRM_COMPLETED_DELIVERY', function(data){
        User.findOne({username: data.deliveryGuy.username})
            .populate('activeDeliveryJob')    
            .then(function(deliveryGuy){
            User.findOne({username: data.client.username}).then(function(client){
                deliveryGuy.isDelivering = false;
                deliveryGuy.isOrdering = false;
                deliveryGuy.earnedMoney += deliveryGuy.activeDeliveryJob[0].price;
                deliveryGuy.deliveredItems += deliveryGuy.activeDeliveryJob[0].item;
                deliveryGuy.ratings.push(data.rating);
                deliveryGuy.save(err => console.log(err)).then(function(){
                    deliveryGuy.activeDeliveryJob = null;
                    deliveryGuy.save();
                });


                client.activeDeliveryJob = null;
                client.isDelivering = false;
                client.isOrdering = false;
                client.save();

                Chat.findOne({users: {$all: [client, deliveryGuy]}}).then(function(chat){
                    let message = new Message();
                    message.author = client;
                    message.receiver = deliveryGuy;
                    message.body = 'Thank you for your delivery!'
                    message.save();

                    chat.messages.push(message);
                    chat.save();

                    io.in(deliveryGuy.username).emit('SUCCESS_COMPLETE_DELIVERY', {
                        client: client,
                        currentUser: deliveryGuy.toProfileJSONFor()
                    })
                })
            })
        })
    });

    socket.on('DECLINE_COMPLETED_DELIVERY', data => {
        User.findOne({username: data.deliveryGuy.username})
        .populate('activeDeliveryJob')    
        .then(function(deliveryGuy){
        User.findOne({username: data.client.username}).then(function(client){
            deliveryGuy.isDelivering = false;
            deliveryGuy.isOrdering = false;
            deliveryGuy.save(err => console.log(err)).then(function(){
                deliveryGuy.activeDeliveryJob = null;
                deliveryGuy.save();
            });


            client.activeDeliveryJob = null;
            client.isDelivering = false;
            client.isOrdering = false;
            client.save();

            Chat.findOne({users: {$all: [client, deliveryGuy]}}).then(function(chat){
                let message = new Message();
                message.author = client;
                message.receiver = deliveryGuy;
                message.body = 'You have not delivered what I wanted.'
                message.save();

                chat.messages.push(message);
                chat.save();

                //opet success zato jer ne radi ništa posebno šta bi failure
                io.in(deliveryGuy.username).emit('SUCCESS_COMPLETE_DELIVERY', {
                    client: client,
                    currentUser: deliveryGuy
                })
            })
        })
    })
    })

    socket.on('CANCEL_DELIVERY_JOB_DELIVERY_GUY', function(data){
        User.findOne({username: data.client.username}).then(function(client){
            User.findOne({username: data.deliveryGuy.username}).then(function(deliveryGuy){
                console.log(deliveryGuy.username, 'USERNAME')

                client.isOrdering = false;
                client.isDelivering = false;
                client.activeDeliveryJob = null;
                client.save(err => console.log(err));

                deliveryGuy.isOrdering = false;
                deliveryGuy.isDelivering = false;
                deliveryGuy.activeDeliveryJob = null;
                deliveryGuy.save(err => console.log(err));

                let message = new Message();
                message.author = deliveryGuy;
                message.receiver = client;
                message.body = 'Sorry, I have to cancel!';
                message.save();

                Chat.findOne({users: {$all: [client, deliveryGuy]}}).then(function(chat){
                    chat.messages.push(message);
                    return chat.save().then(function(){
                        io.in(client.username).emit('RECEIVE_CANCEL_DELIVERY_JOB_DELIVERY_GUY', {
                            deliveryGuy: deliveryGuy
                        })
                        io.in(deliveryGuy.username).emit('UPDATE_CURRENT_USER', {
                            currentUser: deliveryGuy
                        })
                    })
                })
            })
        })
    })

    socket.on('CANCEL_DELIVERY_JOB_CLIENT', function(data){
        User.findOne({username: data.client.username}).then(function(client){
            User.findOne({username: data.deliveryGuy.username}).then(function(deliveryGuy){
                console.log(deliveryGuy.username, 'USERNAME')

                client.isOrdering = false;
                client.isDelivering = false;
                client.activeDeliveryJob = null;
                client.save(err => console.log(err));

                deliveryGuy.isOrdering = false;
                deliveryGuy.isDelivering = false;
                deliveryGuy.activeDeliveryJob = null;
                deliveryGuy.save(err => console.log(err));

                let message = new Message();
                message.author = client;
                message.receiver = deliveryGuy;
                message.body = 'Sorry, I have to cancel!';
                message.save();

                Chat.findOne({users: {$all: [client, deliveryGuy]}}).then(function(chat){
                    chat.messages.push(message);
                    return chat.save().then(function(){
                        io.in(deliveryGuy.username).emit('RECEIVE_CANCEL_DELIVERY_JOB_CLIENT', {
                            client: client
                        });

                        io.in(client.username).emit('UPDATE_CURRENT_USER', {
                            currentUser: client
                        })
                    })
                })
            })
        })
    })
  
    socket.on('REQUEST_DRIVER', function(data){
        User.findOne({username: data.user.username}).then(function(client){
            client.isRequesting = true;
            client.save(err => console.log(err));
            User.geoNear(
                {type: 'Point', coordinates: [client.geometry.coordinates[0], client.geometry.coordinates[1]]},
                {maxDistance: 50000, spherical: true}
            ).then(function(users){
                console.log(users, 'INITIAL USERS')
                let filteredUsers = users.filter(user => user.obj.username !== data.user.username && user.obj.deliveryMode === true && user.obj.available == true );
                let user = filteredUsers[Math.floor(Math.random()*filteredUsers.length)];
                console.log(user, 'IZABRANI KORISNIK'),
                console.log(filteredUsers, 'izabrani useri')
                if(user){
                    if(user.obj.deliveryMode) {
                        if(data.transportation !== ''){
                            if(user.obj.transportation === data.transportation && user.obj.isDelivering === false && user.obj.isOrdering === false){
                                io.in(user.obj.username).emit('REQUEST_DRIVER_CLIENT', {
                                    client: client.toProfileJSONFor(),
                                    from: data.from,
                                    to: data.to,
                                    price: data.price,
                                    item: data.item,
                                    lat: data.lat,
                                    lng: data.lng,
                                    clientLat: data.clientLat,
                                    clientLng: data.clientLng
                                });
                            }
                        } else if(user.obj.isDelivering === false && user.obj.isOrdering === false) {
                            io.in(user.obj.username).emit('REQUEST_DRIVER_CLIENT', {
                                client: client.toProfileJSONFor(),
                                from: data.from,
                                to: data.to,
                                price: data.price,
                                item: data.item,
                                lat: data.lat,
                                lng: data.lng,
                                clientLat: data.clientLat,
                                clientLng: data.clientLng
                            });
                        }
                    }
                }
            });
        });
    });
  
  
    socket.on('SAVE_LOCATION', function(data){
        console.log('SAVING POSITION', data.user.username);
        User.findOne({username: data.user.username}).then(function(user){
            console.log('SAVED COORD', data);
            user.geometry.coordinates = [data.positionLat, data.positionLng];
            user.save();
        })
    });
  
  
    socket.on('NEAR_CLIENTS', function(data){
        User.findOne({username: data.user.username}).then(function(user){
            User.geoNear(
                {type: 'Point', coordinates: [parseFloat(user.geometry.coordinates[0]), parseFloat(user.geometry.coordinates[1])]},
                  {maxDistance: 100000, spherical: true}
            ).then(function(users){
                var count = 0;
                for(var i = 0; i<users.length; i++){
  
                        console.log(users[i].obj);
                        if(!users[i].obj.deliveryMode){
                          count++;
                        }
  
                }
                socket.emit('RECEIVE_NEAR_CLIENTS',  {
                    clientCount: count
                });
            })
        })
    });
  
  
    socket.on('ACCEPT_REQUEST', function(data){
        User.findOne({username: data.deliveryGuy.username}).then(function(deliveryGuy){
            User.findOne({username: data.client.username}).then(function(client){
                if(!client.isOrdering && client.isRequesting){
                    let newDeliveryJob = new DeliveryJob();
                newDeliveryJob.client = client;
                newDeliveryJob.deliveryGuy = deliveryGuy;
                newDeliveryJob.price = data.price,
                newDeliveryJob.transportation = data.transportation,
                newDeliveryJob.item = data.item,
                newDeliveryJob.fromName = data.fromName,
                newDeliveryJob.toName = data.locationName,
                newDeliveryJob.deliveryGuyLocationName = data.deliveryGuyLocationName,
                newDeliveryJob.toLocation = [data.client.geometry[0], data.client.geometry[1]],
                newDeliveryJob.fromLocation = [data.lat, data.lng];
                newDeliveryJob.save(err => {
                    if(err){
                        console.log(err);
                    }
                });
                client.isOrdering = true;
                client.isRequesting = false;
                client.activeDeliveryJob = newDeliveryJob;
                client.save(err => {
                    if(err){
                        console.log(err);
                    }
                });
                deliveryGuy.isDelivering = true;
                deliveryGuy.activeDeliveryJob = newDeliveryJob;
                deliveryGuy.save(err => {
                    if(err){
                        console.log(err);
                    }
                });
                deliveryGuy.addClient(client._id);
                deliveryGuy.save();
                client.addClient(deliveryGuy._id);
                client.save();
                let name = deliveryGuy.username+'_and_'+client.username;
                Chat.findOne({users: {$all: [deliveryGuy, client]}})
                .populate('messages')
                .populate('users')
                .populate({
                    path: 'messages',
                    populate: {
                        path: 'receiver'
                    }
                })
                .populate({
                    path: 'messages',
                    populate: {
                        path: 'author'
                    }
                })
                .then(function(chat){
                    if(chat){
                        let message = new Message();
                        message.author = deliveryGuy;
                        message.receiver = client;
                        message.body = `Hello again ${client.firstName}! I am your delivery guy. Please describe what kind of products do you want me to buy.`
                        message.save();
                        chat.messages.push(message);
                        return chat.save().then(function(){
                            io.in(data.client.username).emit('REQUEST_ACCEPTED', {
                                deliveryGuy: data.deliveryGuy,
                                locationName: newDeliveryJob.deliveryGuyLocationName
                        });
                        io.in(data.deliveryGuy.username).emit('SUCCESS_REQUEST_ACCEPTED', {
                            client: data.client
                        })
                        })
                    }
                    else if(!chat){
                      const nChat = new Chat();
                      nChat.users.push(deliveryGuy, client);
                      nChat.save(function(err){
                          if(err){
                              console.log(err);
                          }
                      })
                      let message = new Message();
                      message.author = deliveryGuy;
                      message.receiver = client;
                      message.body = `Hi ${client.firstName}! I am your delivery guy. Please describe what kind of products do you want me to buy.`
                      message.save();
                      nChat.messages.push(message);
                      return nChat.save(function(err){console.log(err)}).then(function(){
                              io.in(data.client.username).emit('REQUEST_ACCEPTED', {
                                  deliveryGuy: data.deliveryGuy,
                                  locationName: data.locationName
                              });
                              io.in(data.deliveryGuy.username).emit('SUCCESS_REQUEST_ACCEPTED', {
                                  client: data.client
                              })
                          })
                      }
                  })
                } else {
                    io.in(deliveryGuy.username).emit('FAILURE_REQUEST_ACCEPTED', {
                        client: data.client
                    })
                }
                })
          })
      });
  
    socket.on('UPDATE_DELIVERY_GUY_LOCATION', function(data){
        console.log(data, 'DELIVERY GUY LOCATION FIX');
      io.in(data.client.username).emit('DELIVERY_GUY_CHANGE_LOCATION', {
          deliveryGuy: data.deliveryGuy,
          locationName: data.locationName
      })
    });
  
    socket.on('USER_IS_TYPING', function(data){
      io.to(data.name).emit('RECEIVE_USER_IS_TYPING', {
          author: data.author
      })
    });
  
    socket.on('USER_STOPPED_TYPING', function(data){
        io.to(data.name).emit('RECEIVE_USER_STOPPED_TYPING', {
            author: data.author
        })
    });
  
    socket.on('SEND_MESSAGE', function(data){
        Promise.all([
            User.findOne({username: data.receiver}),
            User.findOne({username: data.author.username})
        ]).then(function(results){
            let receiver = results[0];
            let author = results[1];
  
            Chat.findOne({users: {$all: [receiver, author]}}).then(function(chat){
            let message = new Message();
            message.author = author;
            message.receiver = receiver;
            message.body = data.body;
            message.save();
  
            chat.messages.push(message);
            return chat.save().then(function(){
                let nameAlt = data.name.split('_')[2]+'_and_'+data.name.split('_')[0];
                io.to(data.name).emit('RECEIVE_MESSAGE', {
                    message: message
                });
                io.to(nameAlt).emit('RECEIVE_MESSAGE', {
                    message: message
                });
            })
  
          })
        })
    })

    socket.on('REQUEST_PRIVATE_DRIVER', function(data){
        console.log(data.deliveryGuy, 'PRIVATE DELIVERy GUY');
        User.findOne({username: data.user.username}).then(function(user){
            user.isRequesting = true;
            user.save(err => console.log(err)).then(function(){
                io.in(data.deliveryGuy.username).emit('REQUEST_DRIVER_CLIENT', {
                    client: user.toProfileJSONFor(),
                    from: data.from,
                    to: data.to,
                    price: data.price,
                    item: data.item,
                    lat: data.lat,
                    lng: data.lng,
                    clientLat: data.clientLat,
                    clientLng: data.clientLng
                });
            })
        })
    })
  });
}