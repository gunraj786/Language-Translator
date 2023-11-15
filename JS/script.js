/*Here you can see the defined datatypes
and the attributes of the buttons as well as the functions*/ 
const PreText = document.querySelector(".from-text"),
PostText = document.querySelector(".to-text"),
selectTag = document.querySelectorAll("select"),
exIcon = document.querySelector(".exchange"),
transBTN = document.querySelector("button"),
icons = document.querySelectorAll(".row i");
//---------------------------------------------------------


/*To run the main function of the translation text and 
    the placeholder content of the website.*/
selectTag.forEach((tag, id) => {
    for (const region_code in regions) {
        let selected;
        if (id == 0 && region_code == "en-US") {
            selected = " selected";
        }
        else if (id == 1 && region_code == "ru-RU") {
            selected = " selected";
        }
        console.log(regions[region_code]);
        let option = `<option value="${region_code}" ${selected}>${regions[region_code]}</option>`;
        tag.insertAdjacentHTML("beforeend", option); //adding options tag inside select tag.
    }
});
//-------------------------------------------------------------------------------------------------


/*Here you can see the codes of the TAB type icon where 
    you can switch your language preference on your 
        perspective*/
exIcon.addEventListener("click", () => {
    // exchanging textarea and select tag values
    let tempText = PreText.value,
    tempLang = selectTag[0].value;
    PreText.value = PostText.value;
    selectTag[0].value = selectTag[1].value
    PostText.value = tempText;
    selectTag[1].value = tempLang;
});
//-------------------------------------------------------------------
PreText.addEventListener('keyup', () => {
    if(! PreText.value) {
        PostText.value = "";
    }
});

/*To show the result as well as the function of the 
    translation text button.*/
transBTN.addEventListener("click", () => {
    let text = PreText.value,
    translateFrom = selectTag[0].value,
    translateTo = selectTag[1]. value;
//---------------------------------------------------------------------------


/*To stop calling the API with unknown response. 
    Should be done at the last*/
    if(!text) return;
    PostText.setAttribute("placeholder", "Translating...");
//----------------------------------------------------------

    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
    fetch(apiUrl).then(res => res.json()).then(data => {
        //console.log(data);
        PostText.value = data.responseData.translatedText;
        //Sometimes it may translate or 
        //Sometimes it may not because of the "FREE API".
        data.matches.forEach(data => {
            if(data.id === 0) {
                PostText.value = data.translation;
            }
        });
        PostText.setAttribute("placeholder", "Translation");
    });
});

/*Now here you can see the buttons and 
    icons to function as they have to, by setting their 
        values*/
icons.forEach(icons =>{
    icons.addEventListener("click", ({target}) => {
    /**/if(!PreText.value || !PostText.value) return;
        if(target.classList.contains("fa-copy")) {
            if(target.id == "Pre") {
                //console.log("Pre copy icon clicked")
                navigator.clipboard.writeText(PreText.value);
            }else{
                //console.log("Post copy icon clicked")
                navigator.clipboard.writeText(PostText.value);
            }
        } else {

/*Here you can see the utterance datatype which represents
    the Text-To-Speak to utter the when pressing 
        the speaker/voice button*/            
            let utterance;
            if(target.id == "Pre") {
                utterance =  new SpeechSynthesisUtterance(PreText.value);
                utterance.lang = selectTag[0].value;
                //PreSelect tag  for utterance
            } else {
                utterance =  new SpeechSynthesisUtterance(PostText.value);                
                utterance.lang = selectTag[1].value;
                //PostSelect tag for utterance
            }
            speechSynthesis.speak(utterance);
        }
    });
});