```javascript
/**
 * register-page.js
 * Tạo toàn bộ giao diện trang Đăng ký bằng JavaScript thuần.
 */

(function () {
  "use strict";

  // ─────────────────────────────────
  // Helper tạo DOM
  // ─────────────────────────────────
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

  // ─────────────────────────────────
  // SVG Icons
  // ─────────────────────────────────
  const ICONS = {
    phone: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="#c62828"><path d="M6.62 10.79a15.15 15.15 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.61 21 3 13.39 3 4c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.73-.25 1.02l-2.2 2.2z"/></svg>`,
    search: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#555"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>`
  };

  function iconSpan(svgStr, w, h) {
    return el("span", {
      innerHTML: svgStr,
      style: {
        display: "inline-flex",
        width: w + "px",
        height: h + "px"
      }
    });
  }

  // ─────────────────────────────────
  // HEADER
  // ─────────────────────────────────
  function buildHeader() {

    const logo = el("img", {
      src: "/logo.png",
      style: {
        maxHeight: "50px"
      }
    });

    const hotline = el("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        fontWeight: "bold",
        color: "#c62828"
      }
    }, [
      iconSpan(ICONS.phone, 22, 22),
      "02439741791"
    ]);

    const header = el("header", {
      style: {
        height: "70px",
        background: "#fff",
        borderBottom: "1px solid #e0e0e0",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 30px"
      }
    }, [logo, hotline]);

    return header;
  }

  // ─────────────────────────────────
  // NAVBAR
  // ─────────────────────────────────
  function buildNavbar() {

    const searchInput = el("input", {
      placeholder: "Tìm kiếm tài liệu...",
      style: {
        height: "38px",
        padding: "0 12px",
        border: "none",
        outline: "none",
        borderRadius: "4px 0 0 4px"
      }
    });

    const searchBtn = el("button", {
      innerHTML: ICONS.search,
      style: {
        height: "38px",
        width: "46px",
        border: "none",
        background: "#ffc107",
        cursor: "pointer"
      }
    });

    const searchBox = el("div", {
      style: {
        display: "flex"
      }
    }, [searchInput, searchBtn]);

    return el("nav", {
      style: {
        background: "#1976d2",
        height: "50px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 30px",
        color: "#fff"
      }
    }, [
      el("div", { textContent: "Trang chủ" }),
      searchBox
    ]);
  }

  // ─────────────────────────────────
  // FORM FIELD
  // ─────────────────────────────────
  function formField(labelText, name, type, placeholder) {

    const input = el("input", {
      type: type || "text",
      name: name,
      placeholder: placeholder,
      style: {
        width: "100%",
        height: "42px",
        padding: "0 12px",
        border: "1px solid #ccc",
        borderRadius: "4px"
      }
    });

    return el("div", {
      style: { marginBottom: "15px" }
    }, [
      el("label", {
        textContent: labelText,
        style: {
          display: "block",
          marginBottom: "6px"
        }
      }),
      input
    ]);
  }

  // ─────────────────────────────────
  // AUTH PAGE
  // ─────────────────────────────────
  function buildAuthPage() {

    const form = el("form", {
      action: "/customer/register",
      method: "post"
    }, [

      formField("Mã số sinh viên", "StudentCode", "text", "Nhập mã sinh viên"),

      formField("Căn cước công dân", "CitizenId", "text", "Nhập CCCD"),

      formField("Tên tài khoản", "Username", "text", "Nhập username"),

      formField("Mật khẩu", "Password", "password", "Nhập mật khẩu"),

      el("button", {
        textContent: "Đăng ký",
        style: {
          width: "100%",
          height: "44px",
          background: "#1976d2",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer"
        }
      })
    ]);

    const card = el("div", {
      style: {
        width: "420px",
        background: "#fff",
        borderRadius: "6px",
        padding: "30px",
        boxShadow: "0 8px 30px rgba(0,0,0,0.2)"
      }
    }, [
      el("h2", {
        textContent: "Đăng ký",
        style: {
          textAlign: "center",
          marginBottom: "20px"
        }
      }),
      form
    ]);

    const wrap = el("div", {
      style: {
        minHeight: "calc(100vh - 120px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f4f6f9"
      }
    }, [card]);

    return wrap;
  }

  // ─────────────────────────────────
  // INIT PAGE
  // ─────────────────────────────────
  document.body.style.margin = "0";
  document.body.style.fontFamily = "Arial, sans-serif";

  document.body.appendChild(buildHeader());
  document.body.appendChild(buildNavbar());
  document.body.appendChild(buildAuthPage());

})();
```
