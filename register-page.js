/**
 * register-page.js
 * Tạo toàn bộ giao diện trang Đăng ký bằng JavaScript thuần.
 * Sử dụng: thêm <script src="register-page.js"></script> vào cuối <body> của một HTML trống.
 */

(function () {
  "use strict";

  // ─── Helpers ───────────────────────────────────────────────
  function el(tag, attrs, children) {
    const e = document.createElement(tag);
    if (attrs) {
      Object.entries(attrs).forEach(([k, v]) => {
        if (k === "style" && typeof v === "object") {
          Object.assign(e.style, v);
        } else if (k.startsWith("on") && typeof v === "function") {
          e.addEventListener(k.slice(2), v);
        } else if (k === "textContent") {
          e.textContent = v;
        } else if (k === "innerHTML") {
          e.innerHTML = v;
        } else {
          e.setAttribute(k, v);
        }
      });
    }
    if (children) {
      (Array.isArray(children) ? children : [children]).forEach((c) => {
        if (typeof c === "string") e.appendChild(document.createTextNode(c));
        else if (c) e.appendChild(c);
      });
    }
    return e;
  }

  // SVG icon helpers (returns raw SVG string)
  const ICONS = {
    phone: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="#c62828"><path d="M6.62 10.79a15.15 15.15 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.61 21 3 13.39 3 4c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.73-.25 1.02l-2.2 2.2z"/></svg>`,
    book: `<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="white"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z"/></svg>`,
    user: `<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="#1565C0"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>`,
    chevronDown: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M7 10l5 5 5-5z"/></svg>`,
    search: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#555"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>`,
    openBook: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="#555"><path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z"/></svg>`,
    stackedBooks: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M18 2h-8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 7H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2v-1H6V7z"/></svg>`,
    facebook: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M20 3H4a1 1 0 00-1 1v16a1 1 0 001 1h8.615v-6.96h-2.338v-2.725h2.338v-2c0-2.325 1.42-3.592 3.5-3.592.699-.002 1.399.034 2.095.107v2.42h-1.435c-1.128 0-1.348.538-1.348 1.325v1.735h2.697l-.35 2.725h-2.348V21H20a1 1 0 001-1V4a1 1 0 00-1-1z"/></svg>`,
    messenger: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.36 2 2 6.13 2 11.7c0 2.91 1.19 5.44 3.14 7.17.16.13.26.35.26.59l.06 1.84c.04.58.61.96 1.15.73l2.06-.91c.17-.08.36-.1.54-.06.7.19 1.45.3 2.23.3 5.64 0 10-4.13 10-9.7C22 6.13 17.64 2 12 2zm6 7.46-2.93 4.67c-.47.74-1.47.92-2.17.4l-2.33-1.75a.567.567 0 00-.72 0l-3.14 2.38c-.42.32-.97-.19-.68-.64l2.93-4.67c.47-.74 1.47-.92 2.17-.4l2.33 1.75c.21.16.51.16.72 0l3.14-2.38c.42-.32.97.19.68.64z"/></svg>`,
  };

  function iconSpan(svgStr, w, h) {
    const s = el("span", {
      innerHTML: svgStr,
      style: { display: "inline-flex", flexShrink: "0", width: w + "px", height: h + "px" },
    });
    return s;
  }

  // ─── HEADER ────────────────────────────────────────────────
  function buildHeader() {
    // Logo NEU
    const logoNeu = el("div", {
      style: { cursor: "pointer", paddingRight: "20px" },
      onclick: () => (window.location.href = "/"),
    }, [
      el("img", {
        src: "/logo.png",
        alt: "Trường Đại học Xây dựng Hà Nội - Thư viện",
        style: { maxHeight: "54px", display: "block" },
      }),
    ]);

    const divider = el("div", {
      style: {
        width: "1.5px", height: "46px", background: "#ccc",
        margin: "0 16px", flexShrink: "0",
      },
    });

    // Logo NXB
    const logoNxb = el("div", {
      style: { cursor: "pointer", paddingLeft: "4px" },
      onclick: () => (window.location.href = "https://nxbxaydung.com.vn/"),
    }, [
      el("img", {
        src: "https://images.nxbxaydung.com.vn/avatar/image-20240301094051084.svg",
        alt: "Nhà xuất bản Xây Dựng",
        style: { maxHeight: "54px", display: "block" },
      }),
    ]);

    const logos = el("div", { style: { display: "flex", alignItems: "center", gap: "0" } }, [logoNeu, divider, logoNxb]);

    // Hotline helper
    function hotlineBlock(numbers) {
      return el("div", { style: { display: "flex", alignItems: "center", gap: "7px" } }, [
        iconSpan(ICONS.phone, 22, 22),
        el("div", {}, [
          el("div", {
            textContent: "Hotline:",
            style: { fontSize: "11px", color: "#d32f2f", fontWeight: "500", lineHeight: "1.35" },
          }),
          el("div", {
            textContent: numbers,
            style: { fontSize: "13px", fontWeight: "700", color: "#d32f2f", lineHeight: "1.35", whiteSpace: "nowrap" },
          }),
        ]),
      ]);
    }

    const hotlineDivider = el("div", {
      style: { width: "1.5px", height: "36px", background: "#ddd", flexShrink: "0" },
    });

    const hotlines = el("div", { style: { display: "flex", alignItems: "center", gap: "14px" } }, [
      hotlineBlock("02439741791 - 0904833681"),
      hotlineDivider,
      hotlineBlock("0327888669"),
    ]);

    // Button: Tủ sách
    const btnBookcase = el("a", {
      href: "/customer/bookcase",
      style: {
        position: "relative", display: "inline-flex", alignItems: "center",
        justifyContent: "center", gap: "7px", background: "#1565c0", color: "#fff",
        border: "none", borderRadius: "5px", padding: "9px 16px", fontSize: "13px",
        fontWeight: "600", cursor: "pointer", whiteSpace: "nowrap", textDecoration: "none",
      },
    }, [
      iconSpan(ICONS.book, 17, 17),
      document.createTextNode("Tủ sách của bạn"),
      el("span", {
        textContent: "!",
        style: {
          position: "absolute", top: "-8px", right: "-8px", background: "#d32f2f",
          color: "#fff", borderRadius: "50%", width: "20px", height: "20px",
          fontSize: "12px", fontWeight: "700", display: "flex", alignItems: "center",
          justifyContent: "center", border: "2px solid #fff", lineHeight: "1",
        },
      }),
    ]);

    // Button: Đăng nhập
    const btnLogin = el("a", {
      href: "/customer/login",
      style: {
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        gap: "7px", background: "#fff", color: "#1565c0", border: "2px solid #1565c0",
        borderRadius: "5px", padding: "8px 15px", fontSize: "13px", fontWeight: "600",
        cursor: "pointer", whiteSpace: "nowrap", textDecoration: "none",
      },
    }, [
      iconSpan(ICONS.user, 17, 17),
      document.createTextNode("Đăng nhập"),
    ]);

    const right = el("div", { style: { display: "flex", alignItems: "center", gap: "16px" } }, [
      hotlines, btnBookcase, btnLogin,
    ]);

    const inner = el("div", {
      style: { width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" },
    }, [logos, right]);

    return el("header", {
      style: {
        background: "#fff", borderBottom: "1px solid #e0e0e0", height: "68px",
        display: "flex", alignItems: "center", padding: "0 30px",
      },
    }, [inner]);
  }

  // ─── NAVBAR ────────────────────────────────────────────────
  function buildNavbar() {
    function navLink(text, href) {
      return el("a", {
        href: href || "#",
        style: {
          color: "#fff", fontSize: "14px", fontWeight: "500", padding: "0 16px",
          height: "100%", display: "flex", alignItems: "center",
        },
        textContent: text,
      });
    }
    function sep() {
      return el("span", {
        textContent: "|",
        style: { color: "rgba(255,255,255,0.4)", fontSize: "18px" },
      });
    }

    const guideMenu = el("div", {
      style: {
        color: "#fff", fontSize: "14px", fontWeight: "500", padding: "0 16px",
        height: "100%", display: "flex", alignItems: "center", gap: "2px", cursor: "pointer",
      },
    }, [
      document.createTextNode("Hướng dẫn"),
      iconSpan(ICONS.chevronDown, 18, 18),
    ]);

    const links = el("div", { style: { display: "flex", alignItems: "center", height: "100%" } }, [
      navLink("Trang chủ", "/"), sep(), navLink("Danh mục sách"), sep(),
      navLink("Tin tức"), sep(), guideMenu,
    ]);

    const searchInput = el("input", {
      type: "text",
      placeholder: "Nhập tên tác giả, tựa sách, tài liệu bạn muốn tìm kiếm...",
      style: {
        flex: "1", height: "38px", padding: "0 12px", border: "none",
        borderRadius: "4px 0 0 4px", fontSize: "13px", color: "#777",
        outline: "none", background: "#fff",
      },
    });

    const searchBtn = el("button", {
      style: {
        width: "46px", height: "38px", background: "#ffc107", border: "none",
        borderRadius: "0 4px 4px 0", cursor: "pointer", display: "flex",
        alignItems: "center", justifyContent: "center", flexShrink: "0",
      },
      innerHTML: ICONS.search,
    });

    const searchBox = el("div", { style: { display: "flex", alignItems: "center", width: "445px" } }, [
      searchInput, searchBtn,
    ]);

    return el("nav", {
      style: {
        background: "#1976d2", height: "50px", display: "flex", alignItems: "center",
        justifyContent: "space-between", padding: "0 30px",
      },
    }, [links, searchBox]);
  }

  // ─── AUTH FORM INPUT ───────────────────────────────────────
  function formField(labelText, name, type, placeholder) {
    const input = el("input", {
      type: type || "text",
      name: name,
      placeholder: placeholder,
      style: {
        width: "100%", height: "42px", padding: "0 13px",
        border: "1.5px solid #d0d0d0", borderRadius: "4px",
        fontSize: "13.5px", color: "#aaa", background: "#f7f7f7", outline: "none",
      },
      onfocus: function () {
        this.style.borderColor = "#1565C0";
        this.style.background = "#fff";
        this.style.color = "#333";
      },
      onblur: function () {
        this.style.borderColor = "#d0d0d0";
        this.style.background = "#f7f7f7";
        this.style.color = "#aaa";
      },
    });

    return el("div", { style: { marginBottom: "14px" } }, [
      el("label", {
        textContent: labelText,
        style: { display: "block", fontSize: "14px", fontWeight: "400", color: "#333", marginBottom: "6px" },
      }),
      input,
    ]);
  }

  // ─── AUTH PAGE ─────────────────────────────────────────────
  function buildAuthPage() {
    // Background
    const bgImg = el("img", {
      src: "https://ebooklib.huce.edu.vn/content/assets/images/bg-auth.png",
      style: {
        width: "100%", height: "100%", objectFit: "cover",
        filter: "blur(4px) brightness(0.7)", transform: "scale(1.05)",
      },
    });
    bgImg.onerror = function () { this.style.display = "none"; };

    const bgOverlay = el("div", {
      style: {
        position: "absolute", inset: "0",
        background: "linear-gradient(135deg,#8b7355 0%,#a09080 30%,#c0b090 55%,#a08870 75%,#907860 100%)",
        opacity: "0.9",
      },
    });

    const bgWrap = el("div", { style: { position: "absolute", inset: "0", zIndex: "0" } }, [bgImg, bgOverlay]);

    // Tabs
    const tabLogin = el("a", {
      href: "/customer/login",
      textContent: "Tài khoản được cấp",
      style: {
        flex: "1", display: "flex", justifyContent: "center", padding: "14px 0 13px",
        fontSize: "14.5px", fontWeight: "500", color: "#888", textDecoration: "none",
        borderBottom: "3px solid transparent", transition: "color 0.15s",
      },
      onmouseover: function () { this.style.color = "#1565C0"; },
      onmouseout: function () { this.style.color = "#888"; },
    });

    const tabRegister = el("div", {
      textContent: "Đăng ký",
      style: {
        flex: "1", display: "flex", justifyContent: "center", padding: "14px 0 13px",
        fontSize: "14.5px", fontWeight: "600", color: "#1565c0",
        borderBottom: "3px solid #1565c0", cursor: "default",
      },
    });

    const tabs = el("div", { style: { display: "flex", borderBottom: "1px solid #e8e8e8", padding: "0" } }, [
      tabLogin, tabRegister,
    ]);

    // Title
    const title = el("div", {
      textContent: "Đăng ký",
      style: {
        textAlign: "center", fontSize: "22px", fontWeight: "800", color: "#1a1a1a",
        marginBottom: "22px", textTransform: "uppercase", letterSpacing: "1.8px",
      },
    });

    // Submit button
    const submitBtn = el("button", {
      type: "submit",
      textContent: "Đăng ký",
      style: {
        width: "100%", height: "44px", background: "#1976d2", color: "#fff",
        border: "none", borderRadius: "4px", fontSize: "15px", fontWeight: "600",
        cursor: "pointer", letterSpacing: "0.4px", marginBottom: "14px",
      },
      onmouseover: function () { this.style.background = "#1565C0"; },
      onmouseout: function () { this.style.background = "#1976D2"; },
    });

    // "Đã có tài khoản?"
    const loginLink = el("a", {
      href: "/customer/login",
      textContent: "Đăng nhập",
      style: { color: "#1565c0", fontWeight: "600", textDecoration: "none" },
      onmouseover: function () { this.style.textDecoration = "underline"; },
      onmouseout: function () { this.style.textDecoration = "none"; },
    });

    const alreadyHave = el("div", { style: { textAlign: "center", fontSize: "13.5px", color: "#666" } }, [
      document.createTextNode("Đã có tài khoản? "),
      loginLink,
    ]);

    // Form
    const form = el("form", { action: "/customer/register", method: "post" }, [
      formField("Mã số sinh viên", "StudentCode", "text", "Nhập mã số sinh viên"),
      formField("Căn cước công dân", "CitizenId", "text", "Nhập số căn cước công dân"),
      formField("Tên tài khoản", "Username", "text", "Nhập tên tài khoản"),
      // Password field with extra bottom margin
      (() => {
        const f = formField("Mật khẩu", "Password", "password", "Nhập mật khẩu của bạn");
        f.style.marginBottom = "22px";
        return f;
      })(),
      submitBtn,
      alreadyHave,
    ]);

    const formBody = el("div", { style: { padding: "24px 36px 30px" } }, [title, form]);

    // Card
    const card = el("div", {
      style: {
        position: "relative", zIndex: "10", background: "#fff", borderRadius: "4px",
        width: "480px", boxShadow: "0 4px 30px rgba(0,0,0,0.28)", overflow: "hidden",
      },
    }, [tabs, formBody]);

    return el("div", {
      style: {
        position: "relative", minHeight: "580px", display: "flex", alignItems: "center",
        justifyContent: "center", overflow: "hidden", padding: "40px 0",
      },
    }, [bgWrap, card]);
  }

  // ─── FOOTER ────────────────────────────────────────────────
  function buildFooter() {
    // Triangle pattern SVG
    const svgPattern = el("svg", {
      style: {
        position: "absolute", inset: "0", width: "100%", height: "100%",
        opacity: "0.06", pointerEvents: "none",
      },
      innerHTML: `<defs><pattern id="triangles" x="0" y="0" width="44" height="38" patternUnits="userSpaceOnUse"><polygon points="22,4 40,34 4,34" fill="none" stroke="#333" stroke-width="1.8"/></pattern></defs><rect width="100%" height="100%" fill="url(#triangles)"/>`,
    });
    svgPattern.setAttribute("xmlns", "http://www.w3.org/2000/svg");

    const content = el("div", {
      style: { position: "relative", zIndex: "1", textAlign: "center", padding: "30px 20px 28px" },
    }, [
      el("h3", {
        textContent: "Đại học Xây dựng Hà Nội",
        style: {
          fontSize: "16px", fontWeight: "800", color: "#1a1a1a",
          textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "10px",
        },
      }),
      el("p", {
        textContent: "Số 55 đường Giải Phóng, Hai Bà Trưng, Hà Nội",
        style: { fontSize: "14px", color: "#555", marginBottom: "5px" },
      }),
      el("p", {
        textContent: "Số điện thoại: 0975890438",
        style: { fontSize: "14px", color: "#555" },
      }),
    ]);

    const blueBar = el("div", { style: { height: "10px", background: "#1976d2" } });

    return el("footer", {
      style: { background: "#f7f7f7", position: "relative", overflow: "hidden" },
    }, [svgPattern, content, blueBar]);
  }

  // ─── RIGHT SIDEBAR ────────────────────────────────────────
  function buildSidebar() {
    function sidebarBtn(title, bg, hoverBg, icon, borderBottom) {
      const btn = el("div", {
        title: title,
        innerHTML: icon,
        style: {
          width: "42px", height: "44px", background: bg, display: "flex",
          alignItems: "center", justifyContent: "center", cursor: "pointer",
          borderBottom: borderBottom || "none",
        },
        onmouseover: function () { this.style.background = hoverBg; },
        onmouseout: function () { this.style.background = bg; },
      });
      return btn;
    }

    return el("div", {
      style: {
        position: "fixed", right: "0", top: "50%", transform: "translateY(-50%)",
        zIndex: "999", display: "flex", flexDirection: "column",
        boxShadow: "-1px 0 8px rgba(0,0,0,0.18)",
      },
    }, [
      sidebarBtn("Đọc sách", "#d6d6d6", "#c2c2c2", ICONS.openBook, "1px solid #c0c0c0"),
      sidebarBtn("Tủ sách", "#b8925a", "#a07840", ICONS.stackedBooks, "1px solid #a07840"),
      sidebarBtn("Facebook", "#1877f2", "#1060d0", ICONS.facebook, "1px solid #1565d0"),
      sidebarBtn("Messenger", "#0a82ff", "#0066cc", ICONS.messenger),
    ]);
  }

  // ─── INIT ──────────────────────────────────────────────────
  function init() {
    // Inject base styles
    const style = document.createElement("style");
    style.textContent = `
      *{box-sizing:border-box;margin:0;padding:0}
      body{font-family:"Be Vietnam Pro",sans-serif;background:#fff;min-width:1024px}
      a{text-decoration:none;color:inherit}
      input,button{font-family:inherit}
    `;
    document.head.appendChild(style);

    // Inject Google Font link
    const fontLink = document.createElement("link");
    fontLink.href = "https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@300;400;500;600;700;800&display=swap";
    fontLink.rel = "stylesheet";
    document.head.appendChild(fontLink);

    // Set page metadata
    document.title = "Đăng ký";
    document.documentElement.lang = "vi";

    // Build page
    document.body.appendChild(buildHeader());
    document.body.appendChild(buildNavbar());
    document.body.appendChild(buildAuthPage());
    document.body.appendChild(buildFooter());
    document.body.appendChild(buildSidebar());
  }

  // Run when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
