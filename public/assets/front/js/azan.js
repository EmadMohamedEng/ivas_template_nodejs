$(function () {
    $('#chooseAudio').hide();
    var lists = {
        mishary: {
            name: "مشاري راشد",
            tracks: [
                 {
                    name: "الله أكبر الله أكبر",
                    src: "rbt/mshary_1.mp3",
                    code: 11
                },
                {
                    name: "حي على الصلاة",
                    src: "rbt/mshary_2.mp3",
                    code: 12
                },
                {
                    name: "الله أكبر الله أكبر 1",
                    src: "rbt/mshary_3.mp3",
                    code: 13
                },
                {
                    name: "حي على الصلاة 1",
                    src: "rbt/mshary_4.mp3",
                    code: 14
                },
                {
                    name: "الله أكبر الله أكبر 2",
                    src: "rbt/mshary_5.mp3",
                    code: 15
                }

            ]
        },
        tablawy: {
            name: "الطبلاوي",
            tracks: [{
                    name: "الله أكبر الله أكبر",
                    src: "rbt/tablawy_1.mp3",
                    code: 21
                },
                {
                    name: "حي على الصلاة",
                    src: "rbt/tablawy_2.mp3",
                    code: 22
                }
            ]
        },

        helbawy: {
            name: "الهلباوي",
            tracks: [{
                    name: "الله أكبر الله أكبر",
                    src: "rbt/helbawy_1.mp3",
                    code: 31
                },
                {
                    name: "حي على الصلاة",
                    src: "rbt/helbawy_2.mp3",
                    code: 32
                }
            ]
        }
    }


    $('#chooseProvider').on('change', function () {

        var value = $(this).val();
        var player = document.getElementById("player");

        if (player) {
            if (player.paused == false) {
                player.pause();
                player.src = "";
            }
        }
        if (value == "empty") {
            $('#chooseAudio').slideUp();
            $('#player')[0].pause();
            $('body.service').css({
                "background": "#eee url('img/pattern.png') no-repeat bottom"
            });
        } else {
            var list = lists[value];
            var table_content = '<tr><th>اختر</th><th>تشغيل</th><th>الأذان</th></tr>';
            var tracks = list.tracks;

            for (var i = 0; i < tracks.length; i++) {
                table_content +=
                    '<tr>' +
                    '<td class="audio-radio">' +
                    '<input id="audioChosen" class="center" type="radio" name="audio" value="' + tracks[i].code + '" />' +
                    '<label for="" class="center"><span class="center"></span></label>' +
                    '</td>' +
                    '<td class="np-play" data-src="' + tracks[i].src + '"></td>' +
                    '<td>' + tracks[i].name + '</td>' +
                    '</tr>';
            }


            $('#chooseAudio table').html(table_content);

            $('#chooseAudio').slideDown();

            $('#provider-name').text(list.name);

            $('body.service').css({
                "background": "#eee"
            });
        }


    });


    var userAgent = navigator.userAgent;
    var regExp = "/iPhone|iPad|iPod/";
    if (userAgent.match('iPhone') !== null || userAgent.match('iPad') !== null || userAgent.match('iPod') !== null) {
        $(document).on("click", "input:radio[name=audio]:checked", function () {
            var value = $(this).val();
            $("#chooseRBT").prop('href', 'sms:1600&body=' + value);
        });
    } else {
        $(document).on("click", "input:radio[name=audio]:checked", function () {
            var value = $(this).val();
            $("#chooseRBT").prop('href', 'sms:1600?body=' + value);
        });
    }


});

