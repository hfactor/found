---
layout: layout.njk
title: The Found*
description: Collection of my design work since 2007, presented without commentary.
---
<header class="controls">
    <h1>{{ title }}</h1>
    {{ description }}
</header>

<main>
{%- for folder in imagesByFolder -%}
    <section class="folder" aria-labelledby="folder-{{ folder.name | slug }}">
        <h2 id="folder-{{ folder.name | slug }}" class="folder-title">{{ folder.name }}</h2>
        <div class="items grid" role="list">{%- for image in folder.files -%}
            <article class="item" role="listitem">
                <a href="{{ image.path }}" title="View {{ image.name }}" class="item-link">
                    <picture>
                        <source 
                            srcset="{{ image.thumbnail.webp }}" 
                            type="image/webp">
                        <img 
                            src="{{ image.thumbnail.jpeg }}" 
                            alt="Thumbnail of {{ image.name }}"
                            width="{{ image.thumbnail.width }}"
                            height="{{ image.thumbnail.height }}"
                            loading="lazy"
                            decoding="async">
                    </picture>
                </a>
            </article>
        {%- endfor -%}</div>
    </section>
{%- endfor -%}
</main>

<footer>
    <nav aria-label="Site links">
        Inspiration: <a href="https://d.rsms.me/stuff/">RSMS's Stuff</a> • 
        Source: <a href="https://github.com/hfactor/found">Github</a> •
        Contact: <a href="mailto:hiran.v@gmail.com">Email</a>
    </nav>
</footer>