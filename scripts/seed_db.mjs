
import { createClient } from '@supabase/supabase-js';
import { products } from '../src/data/products.js';
import dotenv from 'dotenv';
import path from 'path';

// Configure dotenv to load variables from .env.local at the project root
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

// Load environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Error: Supabase URL or Service Key is not defined.');
  console.error('Please check your .env.local file and ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_KEY are set.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function seedDatabase() {
  console.log('Starting to seed the database...');

  try {
    // 1. Check if products already exist
    const { data: existingProducts, error: selectError } = await supabase
      .from('products')
      .select('id')
      .limit(1);

    if (selectError) {
      console.error('Error checking for existing products:', selectError);
      return;
    }

    if (existingProducts && existingProducts.length > 0) {
      console.log('Products table is not empty. Skipping seeding.');
      return;
    }

    console.log('Products table is empty. Seeding data...');

    // 2. Prepare data for insertion (without IDs)
    const productsToInsert = products.map(({ id, ...rest }) => ({
        ...rest,
        // Ensure boolean values are set if not present in source data
        is_hidden: rest.is_hidden !== undefined ? rest.is_hidden : false,
      }));
      

    // 3. Insert data into the 'products' table
    const { error: insertError } = await supabase
      .from('products')
      .insert(productsToInsert);

    if (insertError) {
      console.error('Error seeding data:', insertError);
    } else {
      console.log('Successfully seeded the products table.');
    }
  } catch (error) {
    console.error('An unexpected error occurred during seeding:', error);
  }
}

seedDatabase();
