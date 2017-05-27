        function upload() {
            var fd = new FormData();
            fd.append("myfile",$("#myfile")[0].files[0]);
            var xhr = new XMLHttpRequest();
            //����״̬��ʵʱ��Ӧ upload.onprogress�����ϴ�����
            xhr.upload.onprogress = function (event) {
                if(event.lengthComputable){
                    var percent = Math.round(event.loaded *100 / event.total);
                    console.log('%d%',percent);
                    $("#upprog").text(percent);
                }
            };
            //���俪ʼ
            xhr.onloadstart = function (event) {
                console.log('��ʼ�ϴ�');
                $("#upprog").text('��ʼ�ϴ�');
                $("#stopbtn").one('click',function () {
                    xhr.abort();
                    $(this).hide();
                });
                loading(true);
            };
            //AJAX���ʱ�¼�
            xhr.onload = function (event) {
                console.log('�ϴ��ɹ�');
                $("#upprog").text('�ϴ��ɹ�');
                console.log(xhr.responseText);
                var ret = JSON.parse(xhr.responseText);
                addToFlist(ret.fname);
            };
            xhr.error = function (event) {
                console.log('��������');
                $("#upprog").text('��������');
            };
            xhr.onabort = function (event) {
                console.log('������ȡ��');
                $("#upprog").text('������ȡ��');
            };
            xhr.onloadend = function (event) {
                console.log('�������');
                loading(false);
            };
            xhr.open('POST','/upload',true);
            xhr.send(fd);
        }
        function  loading(showloading) {
            if(showloading){
                $("#uptxt").show();
                $("#stopbtn").show();
            }else {
                $("#uptxt").hide();
                $("#stopbtn").hide();
            }
        }