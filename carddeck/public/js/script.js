$(function () {

    var socket = io.connect('http://localhost:1433');
    var players = [];
    var username = null;
    var setupTable = function(container_id){
        $.ajax({
            type: 'GET',
            async: false,
            url: "table.html",
            success: function (html) {
                $(container_id).append(html);
            },
            error: function (err) {
                console.warn(err);
                location.reload();
            }
        });

        $('#startbtn').on('click', function () {
            socket.emit('startGame');
        });

        $('#rules').hover(function () {
            $('#show-card').css('background-image', "url(../img/rules.png)").show()
        }, function () {
            $('#show-card').hide();
        });


    };

    var addCard = function(selector, card){
        $(selector).append('<div cardRole="'+card.id+'" class="card card-mini"></div>');
        $(selector + ' div:last-child').hover(function () {
            $('#show-card').css('background-image', "url("+card.image+")").show()
        }, function () {
            $('#show-card').hide();
        }).css('background-image', "url("+card.image+")");

    };

    $('#newroom').on('click', function () {
        if($('#username').val()){
            username = $('#username').val();
        }

       if($('#newPlayerRoom').val()){
         var playerRoom=$('#newPlayerRoom').val();
           socket.emit('NewGameRoom', {room_name: playerRoom, username: username})
       }
    });

    $('#joinbtn').on('click', function () {

          if($('#username').val()){
              username = $('#username').val();
          }

          if($('#joinRoom').val()){
            var joinRoom=$('#joinRoom').val();
              socket.emit('joinRoom', {room_name: joinRoom, username: username})
          }
      });



    socket.on('joinedRoom', function (data) {
        $('#opponents .player-container').each(function () {
            if(!$(this).attr('id')){
                $(this).attr('id', data.username);
                $(this).find('.player-card').css('background', data.isAlive ? '#eee' : '#b48484').html('')
                    .append('<h4>player: '+data.username+'</h4>')
                    .append('<h4 name="points">Score: 0</h4>');

                return false;
            }
        });
        players.push(data.username);

    });

    socket.on('joined', function (data) {
        $('#homemenu').remove();
        setupTable('#container');
        $('#you .player-card').css('background', data.isAlive ? '#eee' : '#b48484')
            .append('<h4>Player: ' + data.username + '</h4>')
            .append('<h4 name="points">points: 0</h4>');

        players.push(data.username);
        if(data.isAlive){
            protection.push(data.username);
        }

        data.players.forEach(function (player) {
            $('#opponents .player-container').each(function () {
                players.push(player.username);
                if(player.isAlive){
                    protection.push(player.username);
                }
                if (!$(this).attr('id')) {
                    $(this).attr('id', player.username);
                    $(this).find('.player-card').css('background', player.isAlive ? '#eee' : '#b48484').html('')
                        .append('<h4>player: ' + player.username + '</h4>')
                        .append('<h4 name="points">points: ' + player.points + '</h4>');


                    return false;
                }
            });
        });
        if(data.isAlive){
            $('#deck-container').show();
            $('#startbtn').trigger('click');
        }
    });
    socket.on('gameStarted', function (data) {
        $('#deck-container').show();
        $('#startbtn').hide();
        $('.hand').empty();
        $('#deck-discards').empty();
        $('#deck').removeClass('empty-deck').addClass('card-back');

        if(data){
            if(data.hasOwnProperty('hand')) {
                addCard('#you .hand', data.hand[0]);
            }
            data.discarded.forEach(function (card) {
                addCard('#deck-discards', card);
            })
        }
        $('.player-container[id] .player-card').css('background', '#b48484')
    });

});
