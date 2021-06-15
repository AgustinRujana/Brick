// Account Menu
const menuAccount = document.getElementsByClassName("accountMenu");
const avatarIcon = document.getElementById('avatarIcon')
avatarIcon.onclick = () => {
    $(menuAccount).slideToggle(400);
    $(avatarIcon).toggleClass('accountMenuOpen')
}

// Mobile Menu
const menuMobile = document.getElementById("ham-menu");
const btn = document.getElementById("btn-menu");
btn.onclick = function() {
    $(menuMobile).slideToggle(400);
    $(btn).toggleClass('active')
}

/*SCROLL */
const scrollUp = (section) => {
    $('html, body').animate({
        scrollTop: $(`#${section}`).offset().top
    },1800)
}
$('#btn-start').click(()=>{scrollUp("subscription-section")})
    
/* FAQ*/ 
$(document).ready(()=>{
    $.getJSON("/js/faq.json",
    function(response, status){
        if (status === "success"){
            let content = response
            for (let QA of content){
                $('#faq-content-container').append(
                    `<div id="question${QA.id} class="question-box">
                        <p id="btn${QA.id}">${QA.question}</p>
                        <div id="answer${QA.id}" class="answer-box">
                            <p>${QA.answer}</p>
                        </div>
                    </div>`);
                $(`#btn${QA.id}`).click(()=>{
                    $(`#answer${QA.id}`).slideToggle(600);
                })
            }
        }
    })
})
