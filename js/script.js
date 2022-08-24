'use strict';

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorsSelector = '.post-author',
  optTagsListSelector = '.tags.list',
  optCloudClassCount = '5',
  optCloudClassPrefix = 'tag-size-',
  optAuthorsListSelector = '.authors.list';

function titleClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  // console.log("Link was clicked!");

  /* remove class 'active' from all article links */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* add class 'active' to the clicked link */
  clickedElement.classList.add('active');
  // console.log("clickedElement:", clickedElement);

  /* remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts .active');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  // console.log(articleSelector);

  /*  find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  // console.log(targetArticle);

  /* add class 'active' to the correct article */
  targetArticle.classList.add('active');
  // console.log("clickedElement:", targetArticle);
}

// 2zadanie

function generateTitleLinks(customSelector = '') {
  console.log(
    'Function generateTitleLinks has been run with arg: ' + customSelector
  );

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);

  titleList.innerHTML = '';

  console.log('Attribute selector: ' + optArticleSelector + customSelector);

  const articles = document.querySelectorAll(
    optArticleSelector + customSelector
  );
  // const articles = document.querySelectorAll(optArticleSelector);

  let html = '';
  /* for each article */

  for (let article of articles) {
    //article.classList.add('id');

    /* get the article id */
    const articleId = article.getAttribute('id');

    /* find the title element */
    /* get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* create HTML of the link */
    const linkHTML =
      '<li><a href="#' +
      articleId +
      '"><span>' +
      articleTitle +
      '</span></a></li>';
    // console.log(linkHTML);

    /* insert link into titleList */
    titleList.innerHTML = titleList.innerHTML + linkHTML;

    html = html + linkHTML;

    // console.log(html);
  }

  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');
  // console.log(links);
  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

function calculateTagsParams(tags) {
  const params = { min: 99999, max: 0 };

  for (let tag in tags) {
    console.log(tag + ' is used ' + tags[tag] + ' times');
    params.max = Math.max(tags[tag], params.max);
    params.min = Math.min(tags[tag], params.min);
  }
  return params;
}

function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;
  console.log(normalizedCount);
  const normalizedMax = params.max - params.min;
  console.log(normalizedMax);
  const percentage = normalizedCount / normalizedMax;
  console.log(percentage);
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
  console.log(classNumber);
  return optCloudClassPrefix + classNumber;
}

function generateTags() {
  /* [NEW] create a new variable allTags with an empty array */
  let allTags = {};
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  // /* START LOOP: for every article: */
  for (let article of articles) {
    // /* find tags wrapper ? selector ?*/
    const titleList = article.querySelector(optArticleTagsSelector);
    titleList.innerHTML = '';
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute ? */
    const articleTags = article.getAttribute('data-tags');
    console.log(articleTags);
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);
    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      console.log(tag);
      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
      console.log(linkHTML);
      /* add generated code to html variable */
      titleList.innerHTML = titleList.innerHTML + linkHTML;

      html = html + ' ' + linkHTML;

      /* [NEW] check if this link is NOT already in allTags */
      if (!allTags[tag]) {
        /*[NEW] add tag to allTags object*/
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    }
    console.log(allTags);
    /* END LOOP: for each tag */
    /* [NEW] add generated code to allTags array */
    // allTags.push(linkHTML);

    /* insert HTML of all the links into the tags wrapper */
    titleList.innerHTML = html;

    console.log(titleList);
    /* END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);
  console.log(tagList);
  /* [NEW] add html from allTags to tagList */
  // tagList.innerHTML = allTags.join(" ");
  // console.log(allTags);
  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams);
  let allTagsHTML = '';

  /*[NEW] START LOOP: for each tag in allTags: */
  for (let tag in allTags) {
    /*[NEW] generate code of a link and add it to AllTags */
    const tagLinkHTML =
      '<li><a ' +
      'class=' +
      calculateTagClass(allTags[tag], tagsParams) +
      ' ' +
      'href ="#tag-' +
      tag +
      '">' +
      tag +
      '</a></li>';
    // console.log("taglinkHTML:", tagLinkHTML);
    // allTagsHTML +=
    //   '<li><a href="">' + tag + " (" + allTags[tag] + ") </a></li>";
    allTagsHTML += tagLinkHTML;
    /*[NEW] END LOOP: for each tag in allTags: */
  }
  /*[NEW] add html from allTagsHTML to tagList */
  tagList.innerHTML = allTagsHTML;
}

generateTags();

function tagClickHandler(event) {
  console.log('Function tagClickHandler has been run.');
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('clicked tag');
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log(href);
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  console.log(tag);
  /* find all tag links with class active */
  const tagActiveLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log(tagActiveLinks);
  /* START LOOP: for each active tag link */
  for (let tagActiveLink of tagActiveLinks) {
    /* remove class active */
    tagActiveLink.classList.remove('active');
    /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const Taglinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log(Taglinks);
  /* START LOOP: for each found tag link */
  for (let Taglink of Taglinks) {
    /* add class active */
    Taglink.classList.add('active');
  }

  /* END LOOP: for each found tag link */
  /* execute function "generateTitleLinks" with article selector as argument */

  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  /* find all links to tags */

  const links = document.querySelectorAll('a[href^="#tag-"]');
  console.log(links);
  /* START LOOP: for each link */
  for (let link of links) {
    console.log('link in addClickListenersToTags is:' + link);
    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);
  }
  /* END LOOP: for each link */
}

addClickListenersToTags();

function generateAuthors() {
  /* find all articles */
  /* [NEW] create a new variable allTags with an empty array */
  let allAuthors = {};

  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */

  for (let article of articles) {
    /* find authors wrapper */
    const authorWrapper = article.querySelector(optArticleAuthorsSelector);
    console.log(authorWrapper);
    const articleAuthor = article.getAttribute('data-author');
    console.log(articleAuthor);
    /* make html variable with empty string */
    let html = '';
    /* for each author */ /* generate HTML of the link */

    const linkHTML =
      '<a href="#author-' +
      articleAuthor +
      '"' +
      '><span>' +
      articleAuthor +
      '</span></a>';
    console.log(linkHTML);
    /* add generated code to html variable */
    authorWrapper.innerHTML = authorWrapper.innerHTML + linkHTML;

    /* add generated code to html variable */
    html = html + linkHTML;

    /* [NEW] check if this link is NOT already in allAuthors */
    /* [NEW] check if this link is NOT already in allTags */
    if (!allAuthors[articleAuthor]) {
      /* [NEW] add generated code to allTags array */
      allAuthors[articleAuthor] = 1;
    } else {
      allAuthors[articleAuthor]++;
    }
    // /* insert HTML of all the links into the author wrapper */
    authorWrapper.innerHTML = html;
    /* END LOOP: for every article: */
  }

  /* [NEW] find list of tags in right column */
  const authorList = document.querySelector(optAuthorsListSelector);
  console.log(authorList);
  /* [NEW] add html from allTags to tagList */
  // AuthorList.innerHTML = allAuthors.join(" ");
  // console.log(Authorlist);
  // const authorsParams = calculateAuthorsParams(allAuthors);
  // console.log("authorsParams:", authorsParams);
  let allAuthorsHTML = '';

  /*[NEW] START LOOP: for each tag in allTags: */
  for (let author in allAuthors) {
    /*[NEW] generate code of a link and add it to AllTags */
    const authorLinkHTML =
      '<li><a ' +
      'href ="#author-' +
      author +
      '">' +
      author +
      '<span> (  ' +
      allAuthors[author] +
      ' ) </span></a></li>';
    // console.log("taglinkHTML:", tagLinkHTML);
    // allTagsHTML +=
    //   '<li><a href="">' + tag + " (" + allTags[tag] + ") </a></li>";
    allAuthorsHTML += authorLinkHTML;
    /*[NEW] END LOOP: for each tag in allTags: */
  }
  /*[NEW] add html from allTagsHTML to tagList */
  authorList.innerHTML = allAuthorsHTML;
}

generateAuthors();

function authorClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log(href);
  /* make a new constant "author" and extract tag from the "href" constant */
  const author = href.replace('#author-', '');
  console.log(author);
  /* find all author links with class active */
  const authorActiveLinks = document.querySelectorAll(
    'a.active[href^="#tag-"]'
  );
  // const articles = document.querySelectorAll(".post");
  // /* START LOOP: for each active author link */
  for (let authorActiveLink of authorActiveLinks) {
    //   //   /* remove class active */
    authorActiveLink.classList.remove('active');
  }

  /* END LOOP: for each active tag link */
  const Authorlinks = document.querySelectorAll('active');
  console.log(Authorlinks);
  // /* START LOOP: for each found tag link */
  for (let Authorlink of Authorlinks) {
    //   /* add class active */
    Authorlink.classList.add('active');
  }
  /* END LOOP: for each found tag link */

  /* execute function "generateTitleLinks" with article selector as argument */

  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors() {
  /* find all links to athors */
  /* START LOOP: for each link */
  const links = document.querySelectorAll('a[href^="#author-"]');

  /* START LOOP: for each link */
  for (let link of links) {
    /* add tagClickHandler as event listener for that link */
    //console.log("selected in addClickListenersToAuthors: " + link);
    link.addEventListener('click', authorClickHandler);
  }
  /* END LOOP: for each link */
}

addClickListenersToAuthors();
