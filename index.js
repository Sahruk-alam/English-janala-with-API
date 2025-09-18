const createElement=(arr)=>{
  const htmlElements=arr.map(item=>`<span class="btn hover:bg-gray-400">${item}</span>`).join(" ");
   return htmlElements;
}
function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}
const manageLodder=(status)=>{
  if(status==true){
    document.getElementById('loader').classList.remove('hidden')
document.getElementById('word-container').classList.add('hidden')
  }
else{
      document.getElementById('word-container').classList.remove('hidden')
      document.getElementById('loader').classList.add('hidden')
}
}
const loadlessons = () => {
fetch('https://openapi.programming-hero.com/api/levels/all')
.then(response => response.json())
.then(d => displaylessons(d.data))
};
const loadLevelWord = (id) => {
  manageLodder(true);
    const url=`https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
    .then(response => response.json())
    .then(data => { 
    const clickbtn=document.getElementById(`btn-lesson-${id}`);
    removeActiveClass();
    clickbtn.classList.add('active');
      displayLoad(data.data) 
    });
};
const removeActiveClass=()=>{
const lessonButtons=document.querySelectorAll('.lesson-btn');
lessonButtons.forEach(btn=>btn.classList.remove('active'));
}
const loadWordDetail=async(id)=>{
const url=`https://openapi.programming-hero.com/api/word/${id}`;

const response=await fetch(url);
const data=await response.json();
displayWordDetail(data.data);
};
const displayWordDetail=(word)=>{
console.log(word);
const detailsBox=document.getElementById('details_container');
detailsBox.innerHTML=`
    <div>
        <h2 class="text-2xl font-bold">${word.word}(<i class="fa-solid fa-microphone"></i>:${word.pronunciation})</h2>
      </div>
      <div>
        <h2 class="font-bold">Meaning</h2>
        <p>${word.meaning}</p>
      </div>
      <div>
        <h2 class="font-bold">Example</h2>
        <p>${word.sentence}</p>
      </div>
      <div>
        <h2 class="font-bold mb-2">সমার্থক শব্দ গুলো</h2>
        <div class="">
          ${createElement(word.synonyms)}
        </div>
      </div>
      <button class="btn btn-primary bg-[#422AD5] hover:bg-green-800 p-2
       rounded-md w-[150px]">Get Started</button>
`
document.getElementById('word_modal').showModal();
}
const displayLoad=(word) => { 
    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML = "";
    if(word.length===0){
        wordContainer.innerHTML=`
        
        <div class=" p-6 text-center col-span-3 rounded-xl space-y-4">
      <img class="mx-auto" src="./assets/alert-error.png" alt="">
        <p class="text-md">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
      <h2 class="text-4xl font-medium">নেক্সট Lesson এ যান</h2>
     </div>
        `
        manageLodder(false);
    return;
    }
    word.forEach(w => {
        // console.log(w);
        const wordDiv = document.createElement('div');
        wordDiv.innerHTML = `
         <div class="bg-white text-center py-10 px-5 rounded-lg shadow-md">
        <h2 class="text-2xl font-bold">${w.word ? w.word : "No Word Available"}</h2>
        <p class="text-lg font-medium">Meaning /Pronounciation</p>
        <div class="text-2xl font-semibold font-bangla">
        ${w.meaning ? w.meaning : "No Meaning Available"} /
         ${w.pronunciation ? w.pronunciation : "No Pronunciation Available"}</div>
        <div class="flex justify-between items-center">
          <button onclick="loadWordDetail(${w.id})" class="btn bg-[#1A91FF20] hover:bg-[#1A91FF90]"><i class="fa-solid fa-circle-info"></i></button>
          <button onclick="pronounceWord('${w.word}')" class="btn bg-[#1A91FF20] hover:bg-[#1A91FF90]"><i class="fa-solid fa-volume-high"></i></button>
        </div>
      </div>
        `
        wordContainer.appendChild(wordDiv);
});
manageLodder(false);
}
const displaylessons = (lessons) => {
    // 1.get contaoner & clear 
    const lessonContainer = document.getElementById('section-container');
    lessonContainer.innerHTML = "";
    // 2.get into every lesson 
    lessons.forEach(lesson => {
        // 3.create element 
        const lessonDiv = document.createElement('div');
        lessonDiv.innerHTML = `
         <button id="btn-lesson-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" 
         class="text-[#422AD5]  hover:text-white font-semibold 
         btn btn-outline btn-primary lesson-btn border-1 p-5 rounded-[5px]">
          <i class="fa-solid fa-book-open"></i>Lesson -${lesson.level_no
            }</button>  
        `;
        // 4.append container 
        lessonContainer.appendChild(lessonDiv);
    });
}
document.getElementById('btn-search').addEventListener('click', () =>{
removeActiveClass();
  const input=document.getElementById('input-search').value.trim().toLowerCase();
console.log(input);
fetch('https://openapi.programming-hero.com/api/words/all')
.then((response)=>response.json()) 
.then((data)=>{
  const allWords=data.data;
  console.log(allWords);
  const filterWord=allWords.filter(word=>word.word.toLowerCase().includes(input))
displayLoad(filterWord);
});


});
loadlessons();