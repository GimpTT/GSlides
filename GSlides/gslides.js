let touchStartX = 0;
let touchEndX = 0;
let touchThreshHold = 50;
class slideShow{
    static activeShow = null;
    constructor(slideShowId){
        this.elmShow = document.getElementById(slideShowId)
        this.currentSlide = 0;
        this.animationClassIn = 'a'
        this.animationClassOut = 'a'
        this.targetShow = slideShowId
        this.listOfSlides = this.elmShow.querySelectorAll('.slideSector')
        this.forwardBtn = this.elmShow.querySelector('.chevronRightContainer')
        this.backBtn = this.elmShow.querySelector('.chevronLeftContainer')
        this.animating = false

        this.forwardInAnimationClass = 'slideInAnimationClass'
        this.forwardOutAnimationClass = 'slideOutAnimationClass'
        this.backOutAnimationClass = 'slideOutAnimationReverseClass'
        this.backInAnimationClass = 'slideInAnimationReverseClass'

        this.slideCaseHandler = this.slideCaseHandler.bind(this)
        this.forwardSlide = this.forwardSlide.bind(this)
        this.reverseSlide = this.reverseSlide.bind(this)

        for(let i=0; i<this.listOfSlides.length; i++){
            this.listOfSlides[i].id = i
        }
        //This is the code that adds an event listener to each slide for animation end
        for(let slideIndex = 0; slideIndex<this.listOfSlides.length; slideIndex++){
                let slide = this.listOfSlides[slideIndex]
                slide.addEventListener('animationend', this.slideCaseHandler)
        }
        this.forwardBtn.addEventListener('click', this.forwardSlide)
        this.backBtn.addEventListener('click', this.reverseSlide)
    }
    //function for when an animation ends
    slideCaseHandler(e){
    let slide = e.target
    let index = slide.id
    slide.classList.remove(this.animationClassIn, this.animationClassOut)
    //Checking if this was the slide going out so that we can hide it post-animation.
    if(index==this.currentSlide-1 || index==this.currentSlide+1){
        slide.classList.add('hiddenSlide')
    }else if(index == this.currentSlide){
        //Calling the slide change broadcaster
        slideChangedFunc(this.targetShow, this.currentSlide, this.slideDirection)
    }
    this.animating = false
    }
    //functions for handleing the arrow btns
    forwardSlide(){
        this.nextSlide()
    }
    reverseSlide(){
        this.backSlide()
    }
    //Goes to next slide
    nextSlide(){
    //Checks if we are still transitioning between slides
    if(!this.animating){
        let end = false
        //Sets current slide to target slide
        this.currentSlide++;
        //Checks if Target slide is valid
        if (this.currentSlide > this.listOfSlides.length-1) {
            //If it isn't valid a flag is set and the current slide is reset to the last possible value
            this.currentSlide = this.listOfSlides.length-1
            end = true
            
        }
        //Hiddes target slide
        this.listOfSlides[this.currentSlide].classList.remove('hiddenSlide')
        //Checks for end flag
        if(!end){
                //Sets the animating flag
                this.animating = true
                //Sets direction for the event broadcaster
                this.slideDirection = 'forward'
                //sets animation on the target slide and the slide going out
                this.listOfSlides[this.currentSlide].classList.add(this.forwardInAnimationClass)
                //theses vars are for legacy purposes but what they do is reset the animation classes
                this.animationClassIn = this.forwardInAnimationClass
                this.listOfSlides[this.currentSlide-1].classList.add(this.forwardOutAnimationClass)
                //theses vars are for legacy purposes but what they do is reset the animation classes
                this.animationClassOut = this.forwardOutAnimationClass
        }
        //If this function all goes well then the current slide var will still be set to the value of the target slide
    }
    }
    //Goes back a slide
    backSlide(){
    //Checks if we are still transitioning between slides
    if(!this.animating){
        let end = false
        //Sets current slide to target slide
        this.currentSlide--;
        //Checks if Target slide is valid
        if (this.currentSlide < 0) {
            //If it isn't valid a flag is set and the current slide is reset to the last possible value
            this.currentSlide = 0
            end = true
            
        }
        //Hiddes target slide
        this.listOfSlides[this.currentSlide].classList.remove('hiddenSlide')
        //Checks for end flag
        if(!end){
            this.animating = true
            //sets animation on the target slide and the slide going out
            this.listOfSlides[this.currentSlide+1].classList.add(this.backInAnimationClass)
            //theses vars are for legacy purposes but what they do is reset the animation classes
            this.animationClassIn = this.backInAnimationClass

            this.listOfSlides[this.currentSlide].classList.add(this.backOutAnimationClass)
            //theses vars are for legacy purposes but what they do is reset the animation classes
            this.animationClassOut = this.backOutAnimationClass
            //Sets direction for the event broadcaster
            this.slideDirection = 'back'

        }
        //If this function all goes well then the current slide var will still be set to the value of the target slide
    }
    }
    //removes all refrences to the show so it gets removed
    destroyShow(){
        for(let i = 0; i< this.listOfSlides.length; i++){
            this.listOfSlides[i].removeEventListener('animationend', this.slideCaseHandler)
        }
        this.forwardBtn.removeEventListener('click', this.forwardSlide)
        this.backBtn.removeEventListener('click', this.reverseSlide)
    }
    //Allows for going straight to a slide
    goToSlide(slideNumber){
        if(slideNumber>-1 && slideNumber<this.listOfSlides.length){
        //Simply hides old slide and shows new one
        this.listOfSlides[this.currentSlide].classList.add('hiddenSlide')
        this.currentSlide=slideNumber
        this.listOfSlides[this.currentSlide].classList.remove('hiddenSlide')

    }else{
        //If slide isnt valid this is ran
        try{
            throw new Error(`Invalid Slide Number: ${slideNumber} Can not go to slide`);
            
        }catch(err){
            console.error(err)
        }
    }
    }

}

//This is the event broadcaster for when the slide is changed
function slideChangedFunc(targetShow, currentSlide, slideDirection){
    const slideChangeEvent = new CustomEvent('slideChanged', {
        detail:{
            slideShowId: targetShow,
            slideNumber: currentSlide,
            changeDirection: slideDirection
        }
    
    })
    document.dispatchEvent(slideChangeEvent)
}

//This is the wrapper function for keyboard controls
function keyboardFunc(event){
    if (event.code === "Space") {
        slideShow.activeShow.nextSlide()
        event.preventDefault(); // stops page from scrolling
    }
    if (event.code === "ArrowLeft") {
        slideShow.activeShow.backSlide()
        event.preventDefault(); // stops page from scrolling
    }
    if (event.code === "ArrowRight") {
        slideShow.activeShow.nextSlide()
        event.preventDefault(); // stops page from scrolling
    }
}

//This logs when the finger is put down
function touchStartFunc(event){
    touchStartX = event.changedTouches[0].screenX
}
//This checks when the finger is lifted then determines if the difference between the start and finish requires action
function touchEndFunc(event){
    touchEndX = event.changedTouches[0].screenX;
    console.log(touchEndX)
    let diff = touchEndX-touchStartX
    if(diff > touchThreshHold){
        slideShow.activeShow.nextSlide()
    }else if(diff < -touchThreshHold){
        slideShow.activeShow.backSlide()
    }
}
document.addEventListener('keydown', keyboardFunc)
document.addEventListener('touchstart', touchStartFunc)
document.addEventListener('touchend', touchEndFunc)
