// Dynamically set the current year in the footer
const currentYear = new Date().getFullYear();
document.getElementById('currentyear').textContent = currentYear;

// Dynamically set the last modified date in the footer
const lastModified = document.lastModified;
document.getElementById('lastModified').textContent = `Last Modified: ${lastModified}`;

const mainnav = document.querySelector('.navigation')
const hambutton = document.querySelector('#menu');

hambutton.addEventListener('click', () => {
    mainnav.classList.toggle('show');
    hambutton.classList.toggle('show');
});

const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
]

document.addEventListener("DOMContentLoaded", () => {
    const gridContainer = document.querySelector(".courses-container");

    // Function to display courses
    function displayCourses(courses) {
        const coursesContainer = document.querySelector(".courses-container");
        coursesContainer.innerHTML = ""; // Clear existing content

        courses.forEach((course) => {
            // Create a course-card div
            const courseCard = document.createElement("div");

            if (course.completed == true) {
                courseCard.classList.add("complete-course-card");
            } else {
                courseCard.classList.add("incomplete-course-card");
            }

            // Create and set up the content for the course name
            const courseNameElement = document.createElement("h3");
            courseNameElement.textContent = `${course.subject} ${course.number}`;

            // Append the content to the course card
            courseCard.appendChild(courseNameElement);

            // Append the course card to the courses container
            coursesContainer.appendChild(courseCard);
        });
    }

    // Function to filter courses based on criteria
    function filterCourses(criteria) {
        let filteredCourses;

        switch (criteria) {
            case 'ALL':
                filteredCourses = courses;
                console.log(filteredCourses);
                break;
            case 'CSE':
                filteredCourses = courses.filter(course => course.subject === criteria);
                console.log(filteredCourses);
                break;
            case 'WDD':
                filteredCourses = courses.filter(course => course.subject === criteria);
                console.log(filteredCourses);
                break;
            default:
                filteredCourses = courses;
                console.log(filteredCourses);
                break;
        }

        displayCourses(filteredCourses);
    }

    // Add event listeners to navigation links
    const navLinks = document.querySelectorAll(".coursesNav a");
    navLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault(); // Prevent default link behavior
            const criteria = link.textContent; // Get the link text to determine the filter
            console.log(criteria);
            filterCourses(criteria);
        });
    });

    // Initially display all courses
    displayCourses(courses);
});