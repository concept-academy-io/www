const courses = [
    'global',
    'general',
].reverse();


document.addEventListener('DOMContentLoaded', function () {

    const container = document.getElementById('courses');

    function fetchCourseContent(file_name) {
        return $.ajax({
            type: 'GET',
            url: `/foundations/${file_name}.html`,
            dataType: 'html',
        });
    }

    courses.forEach(file_name => {
        fetchCourseContent(file_name)
            .then((result) => {
                container.insertAdjacentHTML('beforeend', result);
            });
    });


});

