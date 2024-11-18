---
layout: layout.njk
title: The Found*
description: Collection of my design work since 2007, presented without commentary.

---
<header class="controls">
    <h1>{{ title }}</h1>
    <p>{{ description }}</p>
</header>

<main>
{%- for folder in imagesByFolder -%}
    <section class="folder" aria-labelledby="folder-{{ folder.name | slug }}">
        <h2 id="folder-{{ folder.name | slug }}" class="folder-title">{{ folder.name }}</h2>
        <div class="items grid" role="list">{%- for image in folder.files -%}
            <article class="item" role="listitem">
                <a href="{{ image.path }}" title="View {{ image.name }}" class="item-link">
                    <img 
                        src="{{ image.thumbnail }}" 
                        alt="Thumbnail of {{ image.name }}"
                        width="256"
                        height="256"
                        loading="lazy"
                        decoding="async">
                </a>
            </article>
        {%- endfor -%}</div>
    </section>
{%- endfor -%}
</main>

<footer>
    <nav aria-label="Site links">
    I never had a complete portfolio - building one feels hard and context seems irrelevant now. This is my attempt to break free from perfectionism: just raw designs as they are, found scattered across old chats, emails, and hard drives. A work in progress, updated whenever I discover more. If you have any of my designs tucked away somewhere or spot any issues, <a href="mailto:hiran.v@gmail.com">drop me a mail</a>. Inspired by <a href="https://d.rsms.me/stuff/">RSMS's Stuff</a>. <a href="https://github.com/hfactor/found/">Source</a>.
    </nav>
</footer>