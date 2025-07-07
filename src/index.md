---
layout: layout.njk
title: made
description: Collection of my design work since 2007, presented without commentary.

---
<header>
    <h1 class="title">{{ title }}</h1>
    <div class="description">
    I don't have a polished portfolio - just pieces. I've made that ended up here. No stories, no process write-ups. Just work. I'll keep this page growing. If I missed something you remember, feel free to <a href="mailto:hiran.v@gmail.com">share</a> it.  
    </div>
</header>

<main>
    <div class="items grid" role="list">
    {%- for image in collections.allImages -%}
        {%- assign mod7 = forloop.index0 | modulo: 7 -%}
        <article class="item{% if mod7 == 0 %} item-2x2{% endif %}" role="listitem" data-index="{{ forloop.index }}">
            <div class="item-link">
                <img 
                    src="{{ image.thumbnail }}" 
                    alt="Thumbnail of {{ image.name }}"
                    width="256"
                    height="256"
                    loading="lazy"
                    decoding="async">
                <div class="item-info">
                    <span class="item-title">{{ image.name | replace: "-", " " | replace: "_", " " | replace: ".jpg", "" | replace: ".png", "" | upcase }}</span>
                    <span class="item-folder">{{ image.folder | upcase }}</span>
                </div>
            </div>
        </article>
    {%- endfor -%}
    </div>
</main>

<footer>
    <div class="footer-content">
        <div class="footer-text">Design Sans Dialogue</div>
        <div class="footer-text"><a href="https://www.11ty.dev/">11ty</a> + <a href="https://fonts.google.com/specimen/Space+Grotesk">Space Grotesk</a> </div>
        <div class="footer-text"><a href="https://github.com/hfactor/found/">Source Code</a></div>
    </div>
</footer>