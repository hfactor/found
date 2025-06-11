---
layout: layout.njk
title: The Found*
description: Collection of my design work since 2007, presented without commentary.

---
<header class="controls">
    <h1>{{ title }}</h1>
    <div class="description">
        I never had a complete portfolio - building one feels hard and context seems irrelevant now. This is my attempt to break free from perfectionism: just raw designs as they are, found scattered across old chats, emails, and hard drives. A work in progress, updated whenever I discover more. If you have any of my designs tucked away somewhere or spot any issues, <a href="mailto:hiran.v@gmail.com">drop me a mail</a>. Inspired by <a href="https://d.rsms.me/stuff/">RSMS's Stuff</a>. <a href="https://github.com/hfactor/found/">Source</a>.
    </div>
</header>

<main>
    <div class="items grid" role="list">
    {%- for image in collections.allImages -%}
        <article class="item" role="listitem">
            <a href="{{ image.path }}" title="View {{ image.name }}" class="item-link">
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
            </a>
        </article>
    {%- endfor -%}
    </div>
</main>