window.wordlist = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur commodo elit nibh, ac lobortis nisi lacinia vel. Mauris sodales, lectus eget vulputate imperdiet, orci sapien commodo tortor, a euismod leo justo eget neque. Vivamus justo eros, sagittis quis augue sit amet, congue tempor nulla. Etiam non molestie est, et lacinia nunc. Quisque ornare eu tellus ac cursus. Quisque aliquet convallis odio ac faucibus. Nunc at dignissim justo. Nam ultricies lorem non porttitor imperdiet. Ut cursus neque turpis, ac posuere ex sodales sit amet. Suspendisse maximus pretium tortor, eget pharetra ipsum lacinia vel. Etiam accumsan dolor a varius sollicitudin. Morbi viverra dictum lorem, eget sodales dui ultricies eget. Ut non purus in justo imperdiet aliquet. Aliquam sagittis scelerisque massa, ac maximus lectus bibendum a. Duis suscipit metus id quam rhoncus, vitae eleifend felis ullamcorper. Nulla luctus lorem nec diam scelerisque ultrices. Suspendisse potenti. Vivamus eleifend, quam eget luctus auctor, libero lacus iaculis metus, a gravida lectus urna eu dui. Duis leo augue, euismod eu auctor sed, vehicula a neque. Cras vitae enim feugiat, facilisis neque ut, pulvinar dolor. Maecenas aliquet nulla nec nunc lacinia sollicitudin. Donec tempor posuere magna, id dapibus est laoreet ut. Donec est nulla, dignissim ut nulla mattis, finibus ornare nibh. Ut imperdiet, arcu rhoncus euismod auctor, dolor urna ornare enim, vitae blandit elit quam in lacus. Vestibulum eget blandit turpis. Praesent dapibus porttitor libero et hendrerit. Aliquam vitae tempor ligula. Aliquam hendrerit quam rhoncus porttitor convallis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In hac habitasse platea dictumst.".split(/\s/);

window.getRandomNumber = function (min, max) {
    return parseInt(Math.random() * (max - min) + min);
};
window.getRandomWords = function (number) {
    var words = [];
    for (var i = 0; i<number; i++) {
        words.push(window.wordlist[window.getRandomNumber(0, window.wordlist.length-1)]);
    }
    return words.join(" ");
};
