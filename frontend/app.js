
const SUPABASE_URL = "https://fjdbwzyibriusxbilcaq.supabase.co";
const SUPABASE_KEY = "sb_publishable_t7xD8lY1WjHj9HiYoxCnbA_HRhYWuZV";

const client = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

async function loadProducts(){

  const { data, error } = await client
    .from("products")
    .select("*");

  if(error){
    console.log(error);
    return;
  }

  console.log(data);

}

loadProducts();
