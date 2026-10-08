(function () {
  const $ = (id) => document.getElementById(id);
  const el = (tag, cls, text) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text) e.textContent = text;
    return e;
  };

  // Profile
  document.title = PROFILE.name + " · Courses";
  $("name").textContent = PROFILE.name;
  $("title").textContent = PROFILE.title || "";
  $("bio").textContent = PROFILE.bio || "";
  $("footer-name").textContent = PROFILE.name;
  $("year").textContent = "© " + new Date().getFullYear();

  if (PROFILE.photo) {
    const img = el("img");
    img.src = PROFILE.photo;
    img.alt = PROFILE.name;
    $("avatar").appendChild(img);
  } else {
    $("avatar").textContent = PROFILE.name
      .split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase();
  }

  (PROFILE.links || []).forEach((l) => {
    const a = el("a", null, l.label);
    a.href = l.url;
    if (!l.url.startsWith("mailto:")) { a.target = "_blank"; a.rel = "noopener"; }
    $("contact").appendChild(a);
  });

  // Category filters
  const categories = [...new Set(COURSES.map((c) => c.category).filter(Boolean))];
  let activeCategory = "All";
  if (categories.length > 1) {
    ["All", ...categories].forEach((cat) => {
      const b = el("button", cat === "All" ? "chip active" : "chip", cat);
      b.type = "button";
      b.onclick = () => {
        activeCategory = cat;
        document.querySelectorAll(".chip").forEach((x) => x.classList.toggle("active", x === b));
        render();
      };
      $("filters").appendChild(b);
    });
  }

  // Course cards
  function card(c) {
    const a = el("a", "card");
    a.href = c.url;
    a.target = "_blank";
    a.rel = "noopener";
    const top = el("div", "card-top");
    if (c.code) top.appendChild(el("span", "code", c.code));
    if (c.category) top.appendChild(el("span", "tag", c.category));
    if (top.children.length) a.appendChild(top);
    a.appendChild(el("h2", null, c.title));
    if (c.titleAr) {
      const ar = el("p", "title-ar", c.titleAr);
      ar.lang = "ar";
      ar.dir = "rtl";
      a.appendChild(ar);
    }
    if (c.description) a.appendChild(el("p", null, c.description));
    a.appendChild(el("span", "open", "Open course →"));
    return a;
  }

  function render() {
    const q = $("search").value.trim().toLowerCase();
    const list = COURSES.filter((c) =>
      (activeCategory === "All" || c.category === activeCategory) &&
      [c.title, c.titleAr, c.code, c.description, c.category].join(" ").toLowerCase().includes(q)
    );
    $("grid").replaceChildren(...list.map(card));
    $("empty").hidden = list.length > 0;
    $("count").textContent = list.length + (list.length === 1 ? " course" : " courses");
  }

  $("search").addEventListener("input", render);
  render();
})();
