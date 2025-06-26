const slides = document.querySelectorAll('.diapositiva');
        let currentSlideIndex = 0;

        // Function to scroll to a specific slide
        function goToSlide(index) {
            if (index >= 0 && index < slides.length) {
                slides[index].scrollIntoView({
                    behavior: 'smooth'
                });
                currentSlideIndex = index;
            }
        }

        // Smooth scrolling for navigation links
        document.querySelectorAll('nav a').forEach((anchor, index) => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                goToSlide(index); // Use the index of the nav link
            });
        });

        // Intersection Observer for slide animations
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.querySelectorAll('.animated-on-scroll').forEach((element, index) => {
                        element.style.animationDelay = `${index * 0.2}s`;
                        element.style.animationPlayState = 'running';
                        element.style.opacity = 1;
                    });
                    // Update current slide index when a slide is fully visible
                    const slideId = entry.target.id;
                    const slideNumber = parseInt(slideId.replace('p', '')) - 1; // 'p01' -> 0
                    currentSlideIndex = slideNumber;
                } else {
                    entry.target.querySelectorAll('.animated-on-scroll').forEach(element => {
                        element.style.animationPlayState = 'paused';
                        element.style.opacity = 0;
                    });
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.diapositiva').forEach(diapositiva => {
            observer.observe(diapositiva);
        });

        // Keyboard navigation
        document.addEventListener('keydown', function(event) {
            if (event.key === 'ArrowRight' || event.key === 'PageDown' || event.key === ' ') { // Right arrow, Page Down, Spacebar
                goToSlide(currentSlideIndex + 1);
            } else if (event.key === 'ArrowLeft' || event.key === 'PageUp') { // Left arrow, Page Up
                goToSlide(currentSlideIndex - 1);
            }
        });