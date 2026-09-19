
const SUPABASE_URL = "https://fjdbwzyibriusxbilcaq.supabase.co";
const SUPABASE_KEY = "sb_publishable_t7xD8lY1WjHj9HiYoxCnbA_HRhYWuZV";

const list = document.getElementById("product-list");

function showMessage(message) {
  list.innerHTML = `
    <tr>
      <td colspan="5" style="padding:12px; color:#b91c1c;">
        ${message}
      </td>
    </tr>
  `;
}

async function loadProducts() {
  try {
    showMessage("連線中...");

    if (!window.supabase) {
      throw new Error("Supabase SDK 沒有載入");
    }

    const client = window.supabase.createClient(
      SUPABASE_URL,
      SUPABASE_KEY
    );

    const { data, error } = await client
      .from("products")
      .select("name, sku, cost, retail_price, reseller_price, active")
      .eq("active", true);

    if (error) {
      throw error;
    }

    if (!data || data.length === 0) {
      showMessage("連線成功，但目前查不到商品");
      return;
    }

    list.innerHTML = data.map(product => `
      <tr>
        <td>${product.name}</td>
        <td>${product.sku}</td>
        <td>${product.cost}</td>
        <td>${product.retail_price}</td>
        <td>${product.reseller_price}</td>
      </tr>
    `).join("");

  } catch (err) {
    showMessage("讀取失敗：" + err.message);
  }
}

loadProducts();
