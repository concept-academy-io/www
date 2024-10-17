const courses = [
    'linguistic_communication',
    'applied_math',
    'transactional_wealth',
    'concept_prototyping',
    'craftsmanship_commercialization',
    'digital_media',
    'human_biology',
];

document.addEventListener('DOMContentLoaded', function () {

    function extractAgeBlock(htmlContent, ageRange) {

        try {
            return (new DOMParser())
                .parseFromString(htmlContent, 'text/html')
                .querySelector('*[id="' + ageRange + '"] ul')
                .outerHTML;
        } catch (e) {
            return '';
        }
    }

    function fetchCourseContent(file_name) {
        return $.ajax({
            type: 'GET',
            url: `/curriculum/${file_name}.html`,
            dataType: 'html',
        });
    }


    const container = document.getElementById('courses');
    const range = new URLSearchParams(window.location.search).get('range');

    let page_title = {
        "4-6": "Pre-K to K (Age 4-6)",
        "6-8": "Grades 1-2 (Age 6-8)",
        "8-11": "Grades 3-5 (Age 8-11)",
        "11-15": "Grades 6-9 (Age 11-15)",
        "15-18": "Grades 10-12 (Age 15-18)"
    }[range];
    document.getElementById('titleByRange').innerHTML = page_title;

    // Additional code to fetch and display course content
    const courseContent = extractAgeBlock(page_title, range);
    if (courseContent) {
        container.innerHTML += courseContent;
    }


    courses.forEach(file_name => {
        fetchCourseContent(file_name)
            .then((result) => {
                if (result !== '') {
                    html =
                        '<div class="card mb-4">' +
                        '<div class="card-header">'
                        + file_name.replace(/_/g, ' ').toUpperCase()
                        + '</div>'
                        + extractAgeBlock(result, range)
                        + '</div>';

                    container.insertAdjacentHTML('afterbegin', html);

                }
            });
    });


});

