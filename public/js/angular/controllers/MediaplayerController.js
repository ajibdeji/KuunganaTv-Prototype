App.controller('MediaplayerController', ['$scope', function($scope) {
    $scope.stream1 = "//cdn3.viblast.com/streams/dash/vod-bunny/SNE_DASH_CASE3B_SD_REVISED.mpd";
    $scope.stream2 = "//cdn3.viblast.com/streams/hls/airshow/playlist.m3u8";
    $scope.stream3 = "https://mnmedias.api.telequebec.tv/m3u8/29880.m3u8";
    $scope.stream4 = "http://www.streambox.fr/playlists/test_001/stream.m3u8";
    $scope.stream5 = "../vids/animals/animalstest2/animalstest2.mpd";

    var current_stream = $scope.stream1;

    $scope.start_viblast = function() {
        viblast('#vib-player').setup({
            key: 'N8FjNTQ3NDdhZqZhNGI5NWU5ZTI=',
            stream: current_stream,
            autoplay: true
        });
    }

    $scope.stop_viblast = function() {
        viblast('#vib-player').stop();
    }


    // Load Channel -bb
    $scope.load_channel = function(stream) {
        viblast('#vib-player').stop(); // ensure that Viblast Player is stopped
        current_stream = stream;

        $scope.start_viblast();
    }
}]);