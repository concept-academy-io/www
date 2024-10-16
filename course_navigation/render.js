document.addEventListener('DOMContentLoaded', function () {
    fetch('/course_navigation/index.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(html => {
            console.log(html);
            var elements = document.getElementsByClassName('curriculum-menu');
            console.log(elements.length);

            for (var i = 0; i < elements.length; i++) {
                var element = elements[i];
                var content = html.replace(/{{.*?}}/g, '');
                element.innerHTML = content;
            }

        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
});
