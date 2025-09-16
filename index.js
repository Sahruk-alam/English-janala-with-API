const loadlessons = () => {
fetch('https://openapi.programming-hero.com/api/levels/all')
.then(response => response.json())
.then(d => displaylessons(d.data))
};
const loadLevelWord = (id) => {
    const url=`https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
    .then(response => response.json())
    .then(data => displayLoad(data.data))
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
    return;
    }
    word.forEach(w => {
        console.log(w);
        const wordDiv = document.createElement('div');
        wordDiv.innerHTML = `
         <div class="bg-white text-center py-10 px-5 rounded-lg shadow-md">
        <h2 class="text-2xl font-bold">${w.word ? w.word : "No Word Available"}</h2>
        <p class="text-lg font-medium">Meaning /Pronounciation</p>
        <div class="text-2xl font-semibold font-bangla">
        ${w.meaning ? w.meaning : "No Meaning Available"} /
         ${w.pronunciation ? w.pronunciation : "No Pronunciation Available"}</div>
        <div class="flex justify-between items-center">
          <button class="btn bg-[#1A91FF20] hover:bg-[#1A91FF90]"><i class="fa-solid fa-circle-info"></i></button>
          <button class="btn bg-[#1A91FF20] hover:bg-[#1A91FF90]"><i class="fa-solid fa-volume-high"></i></button>
        </div>
      </div>
        `
        wordContainer.appendChild(wordDiv);
});


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
         <button onclick="loadLevelWord(${lesson.level_no})" class="text-[#422AD5]  hover:text-white font-semibold 
         btn btn-outline btn-primary  border-1 p-5 rounded-[5px]">
          <i class="fa-solid fa-book-open"></i>Lesson -${lesson.level_no
            }</button>  
        `;
        // 4.append container 
        lessonContainer.appendChild(lessonDiv);
    });
}
loadlessons();