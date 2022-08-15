'use strict';

function titleClickHandler(event){

  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');

  /* remove class 'active' from all article links */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* add class 'active' to the clicked link */
  clickedElement.classList.add('active');
  console.log('clickedElement:', clickedElement);

  /* remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts .active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active')
  }

  /* get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  console.log(articleSelector);

  /*  find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle);

  /* add class 'active' to the correct article */
  targetArticle.classList.add('active');
  console.log('clickedElement:', targetArticle);

}

// 2zadanie

const optArticleSelector = '.post',
      optTitleSelector = '.post-title',
      optTitleListSelector = '.titles';

function generateTitleLinks(){
  console.log('Function generateTitleLinks has been run.');

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
    
   
  
  const articles = document.querySelectorAll('.post');
  

  let html = '';
  /* for each article */
  
  for(let article of articles){
    //article.classList.add('id');
   
    /* get the article id */
    const articleId = article.getAttribute('id');

    /* find the title element */
    /* get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
     console.log(linkHTML)

    /* insert link into titleList */
    titleList.innerHTML = titleList.innerHTML + linkHTML;


    html = html + linkHTML;
    


    console.log(html)

  }
   
  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');
  console.log(links)
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }


}

generateTitleLinks();