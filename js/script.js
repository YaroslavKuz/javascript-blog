'use strict';


function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');

  /*  remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /*  add class 'active' to the clicked link */
  clickedElement.classList.add('active');
  console.log('clickedElement:', clickedElement);

  /*   remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.post');

  for(let activeArticle of activeArticles ){
    activeArticle.classList .remove('active');
  }

  /* get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute ('href');
  console.log('Href attribute:', articleSelector);

  /* find the correct article using the selector (value of 'href' attribute) */
  
  const targetArticle = document.querySelector(articleSelector);
  console.log ('Article №', targetArticle);
    

  /* add class 'active' to the correct article */
  targetArticle.classList.add ('active');

}



const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector ='.list.tags ',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-',
  optAuthorsListSelector = '.list.authors';

function generateTitleLinks(customSelector = ''){

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';


  /* for each article */
  let html = '';
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  console.log('customSelector',customSelector);
  for (let article of articles){
    
    console.log(' artykul:', article);

   
  

    /* get the article id */
    const articleId = article.getAttribute('id');
    console.log ('ID №', articleId);

    /* find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* get the title from the title element */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log('Generated link HTML:', linkHTML);

    /* create HTML of the link */
    

    /* insert link into titleList */
    // titleList.insertAdjacentHTML('beforeend', linkHTML);
    html = html + linkHTML;
    
  }
  titleList.innerHTML = html;
  console.log (html);

  const links = document.querySelectorAll('.titles a');
  console.log(links);

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

function calculateTagsParams(tags) {
  // Створюємо об'єкт для зберігання мінімального та максимального значення
  const params = { max: 0, min: 999999 };

  // Проходимо по кожному тегу в об'єкті
  for (let tag in tags) {
    // Якщо значення більше за поточний максимум — оновлюємо
    if (tags[tag] > params.max) {
      params.max = tags[tag];
    }

    // Якщо значення менше за поточний мінімум — оновлюємо
    if (tags[tag] < params.min) {
      params.min = tags[tag];
    }
  }

  // Повертаємо об'єкт з min та max
  return params;
}
calculateTagsParams();

function calculateTagClass(count , params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;

  // Обчислення відсотка
  const percentage = normalizedCount / normalizedMax;

  // Обчислення номера класу (1 до 5 для 5 класів)
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);

  // Повертаємо клас з префіксом
  
  return optCloudClassPrefix + classNumber;
 
}


function generateTags(){

  

  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};

  /* find all articles */
  const articles = document.querySelectorAll('article');
  console.log('All articles', articles);

  /* START LOOP: for every article: */
  for ( let article of articles){
    console.log(' article ',article);
  

    /* find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    console.log('tagsWrapper', tagsWrapper);
    

    /* make html variable with empty string */
    let html = '';
    console.log(html);

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log('TAgs for article:', articleTags);

    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log ('articleTagsArray', articleTagsArray);

    /* START LOOP: for each tag */
    for( let tag of articleTagsArray){
      console.log('tag:',tag);
    

      /* generate HTML of the link */
      const tagHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';

      /* add generated code to html variable */
      html = html + tagHTML;

      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags.hasOwnProperty(tag)) {

        /* [NEW] add generated code to allTags array */
        allTags[tag] = 1;
      }else {
        allTags[tag]++;
      }

      /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    
    tagsWrapper.innerHTML = html;
    /* END LOOP: for every article: */

    
  }

  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);

  /* [NEW] add html from allTags to tagList */
  // tagList.innerHTML = allTags.join(' ');
  const tagsParams  = calculateTagsParams(allTags);
  console.log('tagsParams:',tagsParams);

  // * [NEW] create variable for all links HTML code */
  let allTagsHTML ='';

  // *[NEW] START LOOP: for each tag in allTags: */
  for (let tag in allTags){
    // *[NEW] generate code of a link and add it to allTagsHTML */
    const className = calculateTagClass(allTags[tag], tagsParams);
    allTagsHTML += '<li><a href="#tag-' + tag + '" class="' + className + '">' + tag + ' (' + allTags[tag] + ')</a></li>';

  }
  // *[NEW] END LOOP: for each tag in allTags:*/

  // *[NEW] add html from allTagsHTML to tagList */
  tagList.innerHTML = allTagsHTML;

}
generateTags();

function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
 
  
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log ('Tag was clicked:',href);

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-','');
  console.log('Tag:',tag); 

  /* find all tag links with class active */
  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log ('activeTagLinks',activeTagLinks);


  /* START LOOP: for each active tag link */
  for (let activeTagLink of activeTagLinks){

    /* remove class active */
    activeTagLink.classList.remove('active');
  }
  /* END LOOP: for each active tag link */

  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log('tagLinks', tagLinks);

  /* START LOOP: for each found tag link */
  for (let tagLink of tagLinks){

    /* add class active */
    tagLink.classList.add('active');
  }
  /* END LOOP: for each found tag link */

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}


function addClickListenersToTags(){
  /* find all links to tags */
  const tagLinks = document.querySelectorAll('.post-tags a');

  const sidebarTagLinks = document.querySelectorAll('.list.tags a');

  const allTagsLinks = [...tagLinks, ...sidebarTagLinks];

  /* START LOOP: for each link */
  for(let link of allTagsLinks){
  /* add tagClickHandler as event listener for that link */
 
  
    link.addEventListener('click', tagClickHandler);

  /* END LOOP: for each link */
  }
}

addClickListenersToTags();

function generateAuthors() {
  // Знайдемо всі статті
  // Find all articles
  const articles = document.querySelectorAll('article');
  let allAuthors = {};
  console.log('articles:',articles);

  // Для кожної статті генеруємо посилання на автора
  // For each article, generate an author link
  for (let article of articles) {
    // Отримуємо ім'я автора з атрибута data-author
    // Get the author's name from the data-author attribute
    const author = article.getAttribute('data-author');
    console.log('Author:', author);
    
    // Знайдемо обгортку для автора
    // Find the wrapper for the author
    const autoWraper = article.querySelector(optArticleAuthorSelector);
    console.log('autoWraper', autoWraper);

    // Створюємо HTML з лінком на автора
    // Create the HTML with a link to the author
    const authorHTML = '<a href="#author-' + author + '">' + author + '</a>';

    // Вставляємо цей HTML у обгортку
    // Insert this HTML into the wrapper

    autoWraper.innerHTML = authorHTML;

    if (!allAuthors.hasOwnProperty(author)) {
      allAuthors[author] = 1;
    } else {
      allAuthors[author]++;
    }
   
  }

  const authorsList = document.querySelector(optAuthorsListSelector);
  let allAuthorsHTML = '';

  for (let author in allAuthors) {
    allAuthorsHTML += '<li><a href="#author-' + author + '">' + author + ' (' + allAuthors[author] + ')</a></li>';
  }

  authorsList.innerHTML = allAuthorsHTML;
}

generateAuthors();

function authorClickHandler(event) {
  event.preventDefault();

  // Отримуємо натиснуту на посилання елемент
  // Get the clicked link element
  const clickedElement = this;
  
  // Отримуємо href атрибут з посилання
  // Get the href attribute from the link
  const href = clickedElement.getAttribute('href');

  // Витягуємо ім'я автора з href
  // Extract the author's name from the href
  const author = href.replace('#author-', '');

  // Видаляємо клас "active" з усіх авторських посилань
  // Remove the "active" class from all author links
  const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"], .list.authors a.active');
  for (let link of activeAuthorLinks) {
    link.classList.remove('active');
  }

  // Додаємо клас "active" до натиснутого посилання
  // Add the "active" class to the clicked link
  clickedElement.classList.remove('active');

  // Генеруємо список статей лише з цим автором
  // Generate the list of articles with this author only
  generateTitleLinks('[data-author="' + author + '"]');

}

function addClickListenersToAuthors (){

  // Знайдемо всі посилання на авторів
  // Find all links to authors
  const authorLinks =document.querySelectorAll('.post-author a');

  // І всі посилання на авторів у правій колонці
  const sidebarAuthorLinks = document.querySelectorAll('.list.authors a');

  // Об'єднуємо обидва набори посилань
  const allAuthorLinks = [...authorLinks, ...sidebarAuthorLinks];
  console.log('allAuthorLinks', allAuthorLinks);

  // Для кожного посилання на автора додаємо обробник події
  // For each author link, add an event listener
  for( let link of allAuthorLinks){
    link.addEventListener('click', authorClickHandler);
  }

}
addClickListenersToAuthors ();
