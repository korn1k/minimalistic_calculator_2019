let context = undefined;
let canvas = undefined;

    document.addEventListener('DOMContentLoaded',() => {
        const canvasHTML = document.createElement('canvas');
        const box = document.querySelector('.outter-part');
        const text = document.createTextNode('Your browser does not support the HTML5 canvas tag.');
            
        canvasHTML.setAttribute('style', 'width: 100%; height: 100%;');
        canvasHTML.setAttribute('id', 'canvas-view');
        canvasHTML.appendChild(text);
        box.appendChild(canvasHTML);

        canvas = document.getElementById('canvas-view');
        context = canvas.getContext('2d');
        canvasAnimation();

        return console.log('%cAnimation canvas is ready to start!', 'color: green;');
    }, false);

    class CircleAnimate {
        constructor({xCoords, yCoords, dxCoords, dyCoords, radius} = {}) {
            this.xCoordinate = xCoords;
            this.yCoordinate = yCoords;
            this.dxCoordinates = dxCoords;
            this.dyCoordinates = dyCoords;
            this.radius = radius;
        }

        make() {
            context.beginPath();
            context.arc(this.xCoordinate, this.yCoordinate, this.radius, 0, Math.PI * 2, false);
            context.fillStyle = 'transparent';
            context.fill();
            context.lineWidth = 1;
            context.strokeStyle = '#bdc3c7';
            context.stroke();
        }

        draw() {    
            if (this.xCoordinate + this.radius > canvas.width || this.xCoordinate - this.radius < 0) {
               this.dxCoordinates = -this.dxCoordinates;
           }

            if (this.yCoordinate + this.radius > canvas.height || this.yCoordinate - this.radius < 0) {
                this.dyCoordinates = -this.dyCoordinates;
           }

            this.xCoordinate += this.dxCoordinates;
            this.yCoordinate += this.dyCoordinates;

           this.make();
        }
    }

    const canvasAnimation = number => {
        const globalCircles = [];

            for (let i = 0; i < number; i++) {
                globalCircles.push(
                    new CircleAnimate({
                        xCoords: Math.random() * (canvas.width - 2) + 4, 
                        yCoords: Math.random() * (canvas.height - 2) + 4, 
                        dxCoords: Math.random() * 1, 
                        dyCoords: Math.random() * 1, 
                        radius: Math.random() * 2
                    }));
            }

            const animate = () => {
                requestAnimationFrame(animate);
                    context.clearRect(0, 0, canvas.width, canvas.height);
                        for (let i= 0; i < globalCircles.length; i++) {
                            globalCircles[i].draw();
                        }
            }

            animate();
        
        return console.log('%cCircles are processed.', 'color: red;');
    }