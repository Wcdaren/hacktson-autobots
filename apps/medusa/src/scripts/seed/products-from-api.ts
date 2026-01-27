import { CreateProductWorkflowInputDTO, ProductCollectionDTO, ProductTagDTO } from '@medusajs/framework/types';
import { ProductStatus } from '@medusajs/utils';

/**
 * Products imported from Castlery Production API
 * Generated on: 2026-01-27T04:03:21.699Z
 * Total products: 36
 * Source: Castlery Sitemap + Production API (https://apigw-sg-prod.castlery.com/v2)
 * 
 * Features:
 * - Hierarchical category structure
 * - Complete option metadata from API
 * - Accurate variant option values with presentation names
 * - Swatch images preserved in metadata
 */

export const importedCategoryHierarchy = [
  {
    "name": "Outdoor",
    "permalink": "outdoor",
    "children": [
      {
        "name": "Outdoor Furniture Covers",
        "permalink": "outdoor/outdoor-furniture-covers"
      },
      {
        "name": "Outdoor Modular 2-Seater Sofas",
        "permalink": "outdoor/outdoor-modular-2-seater-sofas"
      }
    ]
  },
  {
    "name": "Storage",
    "permalink": "storage",
    "children": [
      {
        "name": "TV Consoles",
        "permalink": "storage/tv-consoles"
      },
      {
        "name": "Sideboards",
        "permalink": "storage/sideboards"
      },
      {
        "name": "Bedside Tables",
        "permalink": "storage/bedside-tables"
      }
    ]
  },
  {
    "name": "Sofa & Armchairs",
    "permalink": "sofa-armchairs",
    "children": [
      {
        "name": "3 Seater Sofas",
        "permalink": "sofa-armchairs/3-seater-sofas"
      },
      {
        "name": "Modular Chaises",
        "permalink": "sofa-armchairs/modular-chaises"
      },
      {
        "name": "Modular Armless Sofas",
        "permalink": "sofa-armchairs/modular-armless-sofas"
      },
      {
        "name": "L-Shape Sectional Sofas",
        "permalink": "sofa-armchairs/l-shape-sectional-sofas"
      },
      {
        "name": "Extended 3 Seater Sofas",
        "permalink": "sofa-armchairs/extended-3-seater-sofa"
      },
      {
        "name": "Ottomans",
        "permalink": "sofa-armchairs/ottomans"
      }
    ]
  },
  {
    "name": "Tables",
    "permalink": "tables",
    "children": [
      {
        "name": "Extendable Dining Tables",
        "permalink": "tables/extendable-dining-tables"
      },
      {
        "name": "Desks",
        "permalink": "tables/desks"
      },
      {
        "name": "Coffee Tables",
        "permalink": "tables/coffee-tables"
      },
      {
        "name": "Console Tables",
        "permalink": "tables/console-tables"
      }
    ]
  },
  {
    "name": "Chairs & Benches",
    "permalink": "chairs-benches",
    "children": [
      {
        "name": "Dining Benches",
        "permalink": "chairs-benches/dining-benches"
      },
      {
        "name": "Dining Chairs",
        "permalink": "chairs-benches/dining-chairs"
      }
    ]
  },
  {
    "name": "Accessories",
    "permalink": "accessories",
    "children": [
      {
        "name": "Cushions",
        "permalink": "accessories/cushions"
      }
    ]
  },
  {
    "name": "Tableware",
    "permalink": "tableware",
    "children": [
      {
        "name": "Cereal Bowls",
        "permalink": "tableware/cereal-bowls"
      },
      {
        "name": "Salad Plates",
        "permalink": "tableware/salad-plates"
      },
      {
        "name": "Serving Bowls",
        "permalink": "tableware/serving-bowls"
      }
    ]
  }
];

export const importedCategories = [
  "Outdoor",
  "Outdoor Furniture Covers",
  "TV Consoles",
  "Storage",
  "3 Seater Sofas",
  "Sofa & Armchairs",
  "Outdoor Modular 2-Seater Sofas",
  "Extendable Dining Tables",
  "Tables",
  "Modular Chaises",
  "Chairs & Benches",
  "Dining Benches",
  "Modular Armless Sofas",
  "L-Shape Sectional Sofas",
  "Desks",
  "Accessories",
  "Cushions",
  "Coffee Tables",
  "Sideboards",
  "Console Tables",
  "Bedside Tables",
  "Dining Chairs",
  "Extended 3 Seater Sofas",
  "Ottomans",
  "Cereal Bowls",
  "Tableware",
  "Salad Plates",
  "Serving Bowls"
];

export const importedTags = [
  "storewide_sale",
  "all furniture excluding accessories\t",
  "storewide exclude beige covers",
  "all products",
  "gss event storewide sale excluding gwp",
  "all product excluding customisation",
  "match & save",
  "bestsellers",
  "all_tv_stands",
  "style_midcenturymodern",
  "sofa_bundle_complementary_products",
  "tv_console",
  "earth_day",
  "small_living_room_furniture",
  "small_space_furniture",
  "s3_event (do not use)",
  "rounded_furniture",
  "all_sofa",
  "holiday",
  "beige cover fur",
  "highlight",
  "roz_1",
  "style_modernfarmhouse",
  "furniture_with_storage",
  "minimalist_furniture",
  "new_arrivals",
  "s1_2023_skus",
  "small_table_furniture",
  "all_indoor_dining_table",
  "acacia_wood",
  "all_dining_table",
  "web_ar",
  "coastal",
  "modern_farmhouse",
  "extendable_dining_tables",
  "midcenturymodern",
  "spring",
  "bestselling",
  "2020withcastlery",
  "style_moderncontemporary",
  "icu_list",
  "modular_sofas",
  "u_c_shaped_sofa",
  "style_postmodern",
  "curve_angled_sofa",
  "modern_luxe",
  "performance_boucle_sofas",
  "c&c_accessories",
  "new",
  "clearance",
  "sale",
  "japandi_furniture",
  "all_coffee_table",
  "s3_event_tag",
  "all_sideboard",
  "sideboard",
  "s3'25 products",
  "le.anne",
  "small_bedroom_furniture",
  "trade_side_tables",
  "curved_furniture",
  "all_bedside_side_table",
  "all_indoor_dining_chair",
  "cosy_furniture",
  "all_ottoman",
  "all_accessories",
  "homeware launch"
];

export const importedCollections = [
  "Sierra Outdoor Collection",
  "Madison Collection",
  "Sawyer Collection",
  "Seb Collection",
  "Dawson Collection",
  "Jonathan Collection",
  "Sloane Collection",
  "Auburn Collection",
  "Casa Collection",
  "Crescent Collection",
  "Austen Collection",
  "Hamilton Collection",
  "Mori Collection",
  "Vincent Collection",
  "Grace Collection"
];

export const seedProductsFromAPI = ({
  collections,
  tags,
  sales_channels,
  categories,
  shipping_profile_id,
  region_id,
}: {
  collections: ProductCollectionDTO[];
  tags: ProductTagDTO[];
  categories: { id: string; name: string }[];
  sales_channels: { id: string }[];
  shipping_profile_id: string;
  region_id: string;
}): CreateProductWorkflowInputDTO[] => [
  {
    title: "Sierra Outdoor Right Facing 2 Seater Sofa Cover",
    description: "Perfectly tailored to fit your outdoor furniture, these covers are durable and made to weather the elements.",
    handle: "sierra-outdoor-right-facing-2-seater-sofa-cover",
    status: ProductStatus.PUBLISHED,
    thumbnail: "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709284607/crusader/variants/50440921-IV/Sierra-Outdoor-2-Seater-Sofa-Cover-Angle-ivory-1709284605.png",
    shipping_profile_id,
    category_ids: [categories.find(c => c.name === "Outdoor")?.id, categories.find(c => c.name === "Outdoor Furniture Covers")?.id].filter(Boolean),
    tag_ids: [tags.find(t => t.value === "storewide_sale")?.id, tags.find(t => t.value === "all furniture excluding accessories\t")?.id, tags.find(t => t.value === "storewide exclude beige covers")?.id, tags.find(t => t.value === "all products")?.id, tags.find(t => t.value === "gss event storewide sale excluding gwp")?.id, tags.find(t => t.value === "all product excluding customisation")?.id, tags.find(t => t.value === "match & save")?.id].filter(Boolean),
    collection_id: collections.find(c => c.title === "Sierra Outdoor Collection")?.id,
    images: [
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709284607/crusader/variants/50440921-IV/Sierra-Outdoor-2-Seater-Sofa-Cover-Angle-ivory-1709284605.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709288688/crusader/variants/50440921-IV/Redesign-Sierra-Right-Facing-2-Seater-Sofa_-Cover_1-1709288686.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1695019330/crusader/variants/50440848-IV/Outdoor-Fabric_New_1_US-1695019329.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1708418410/crusader/variants/50440884-IV/Outdoor-Fabric_New-1708418407.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691118112/crusader/variants/50440845-IV/Sierra-Outdoor-Sofa-Cover-Sketch-Map-AU-1691118110.jpg"
      }
],
    sales_channels: sales_channels.map(({ id }) => ({ id })),
    options: [
      {
        title: "Material",
        values: [
        "Ivory"
        ]
      }
    ],
    variants: [
      {
        title: "Sierra Outdoor Right Facing 2 Seater Sofa Cover, Ivory",
        sku: "50440921-IV",
        options: {
          "Material": "Ivory"
},
        manage_inventory: false,
        prices: [
          {
            amount: 10000,
            currency_code: 'usd',
          },
          {
            amount: 10000,
            currency_code: 'usd',
            region_id,
          },
        ],
      }
    ],
  },
  {
    title: "Sierra Outdoor 3 Seater Sofa Cover",
    description: "Perfectly tailored to fit your outdoor furniture, these covers are durable and made to weather the elements.",
    handle: "sierra-outdoor-3-seater-sofa-cover",
    status: ProductStatus.PUBLISHED,
    thumbnail: "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709284649/crusader/variants/50440926-IV/Sierra-Outdoor-3-Seater-Sofa-Cover-Angle-ivory-1709284647.png",
    shipping_profile_id,
    category_ids: [categories.find(c => c.name === "Outdoor")?.id, categories.find(c => c.name === "Outdoor Furniture Covers")?.id].filter(Boolean),
    tag_ids: [tags.find(t => t.value === "storewide_sale")?.id, tags.find(t => t.value === "all furniture excluding accessories\t")?.id, tags.find(t => t.value === "storewide exclude beige covers")?.id, tags.find(t => t.value === "all products")?.id, tags.find(t => t.value === "gss event storewide sale excluding gwp")?.id, tags.find(t => t.value === "all product excluding customisation")?.id, tags.find(t => t.value === "match & save")?.id].filter(Boolean),
    collection_id: collections.find(c => c.title === "Sierra Outdoor Collection")?.id,
    images: [
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709284649/crusader/variants/50440926-IV/Sierra-Outdoor-3-Seater-Sofa-Cover-Angle-ivory-1709284647.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709520492/crusader/variants/50440926-IV/Redesign-Sierra-3-Seater-Sofa__-Cover_1-1709520489.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1695019330/crusader/variants/50440848-IV/Outdoor-Fabric_New_1_US-1695019329.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1708418410/crusader/variants/50440884-IV/Outdoor-Fabric_New-1708418407.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691118112/crusader/variants/50440845-IV/Sierra-Outdoor-Sofa-Cover-Sketch-Map-AU-1691118110.jpg"
      }
],
    sales_channels: sales_channels.map(({ id }) => ({ id })),
    options: [
      {
        title: "Material",
        values: [
        "Ivory"
        ]
      }
    ],
    variants: [
      {
        title: "Sierra Outdoor Sofa Cover, Ivory",
        sku: "50440926-IV",
        options: {
          "Material": "Ivory"
},
        manage_inventory: false,
        prices: [
          {
            amount: 11000,
            currency_code: 'usd',
          },
          {
            amount: 11000,
            currency_code: 'usd',
            region_id,
          },
        ],
      }
    ],
  },
  {
    title: "Sierra Outdoor Lounge Chair Cover",
    description: "Perfectly tailored to fit your outdoor furniture, these covers are durable and made to weather the elements.",
    handle: "sierra-outdoor-lounge-chair-cover",
    status: ProductStatus.PUBLISHED,
    thumbnail: "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709284722/crusader/variants/50440920-IV/Sierra-Outdoor-Lounge-Chair-Cover-Angle-ivory-1709284720.png",
    shipping_profile_id,
    category_ids: [categories.find(c => c.name === "Outdoor")?.id, categories.find(c => c.name === "Outdoor Furniture Covers")?.id].filter(Boolean),
    tag_ids: [tags.find(t => t.value === "storewide_sale")?.id, tags.find(t => t.value === "all furniture excluding accessories\t")?.id, tags.find(t => t.value === "storewide exclude beige covers")?.id, tags.find(t => t.value === "all products")?.id, tags.find(t => t.value === "gss event storewide sale excluding gwp")?.id, tags.find(t => t.value === "all product excluding customisation")?.id, tags.find(t => t.value === "match & save")?.id].filter(Boolean),
    collection_id: collections.find(c => c.title === "Sierra Outdoor Collection")?.id,
    images: [
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709284722/crusader/variants/50440920-IV/Sierra-Outdoor-Lounge-Chair-Cover-Angle-ivory-1709284720.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709288799/crusader/variants/50440920-IV/Redesign-Sierra-Lounge-Chair-Cover_1-1709288797.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1695019330/crusader/variants/50440848-IV/Outdoor-Fabric_New_1_US-1695019329.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1708418410/crusader/variants/50440884-IV/Outdoor-Fabric_New-1708418407.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691118112/crusader/variants/50440845-IV/Sierra-Outdoor-Sofa-Cover-Sketch-Map-AU-1691118110.jpg"
      }
],
    sales_channels: sales_channels.map(({ id }) => ({ id })),
    options: [
      {
        title: "Material",
        values: [
        "Ivory"
        ]
      }
    ],
    variants: [
      {
        title: "Sierra Outdoor Lounge Chair Cover, Ivory",
        sku: "50440920-IV",
        options: {
          "Material": "Ivory"
},
        manage_inventory: false,
        prices: [
          {
            amount: 8000,
            currency_code: 'usd',
          },
          {
            amount: 8000,
            currency_code: 'usd',
            region_id,
          },
        ],
      }
    ],
  },
  {
    title: "August TV Console",
    description: "August is a sophisticated statement piece encased in a modern slatted façade and topped with Italian Carrara marble.",
    handle: "august-tv-console-180cm",
    status: ProductStatus.PUBLISHED,
    thumbnail: "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1624960646/crusader/variants/52460065/August-TV-Console-Front.png",
    shipping_profile_id,
    category_ids: [categories.find(c => c.name === "TV Consoles")?.id, categories.find(c => c.name === "Storage")?.id].filter(Boolean),
    tag_ids: [tags.find(t => t.value === "bestsellers")?.id, tags.find(t => t.value === "storewide_sale")?.id, tags.find(t => t.value === "all furniture excluding accessories\t")?.id, tags.find(t => t.value === "storewide exclude beige covers")?.id, tags.find(t => t.value === "gss event storewide sale excluding gwp")?.id, tags.find(t => t.value === "all product excluding customisation")?.id, tags.find(t => t.value === "match & save")?.id, tags.find(t => t.value === "all_tv_stands")?.id, tags.find(t => t.value === "all products")?.id, tags.find(t => t.value === "style_midcenturymodern")?.id, tags.find(t => t.value === "sofa_bundle_complementary_products")?.id, tags.find(t => t.value === "tv_console")?.id].filter(Boolean),
    
    images: [
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1624960646/crusader/variants/52460065/August-TV-Console-Front.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1627892951/crusader/variants/52460065/August-TV-Console-Dim.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1624960656/crusader/variants/52460065/August-TV-Console-Angle.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1624960660/crusader/variants/52460065/August-TV-Console-Side.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1624960662/crusader/variants/52460065/August-TV-Console-Back.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1624960642/crusader/variants/52460065/August-TV-Console-Lifestyle-Crop.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1624960647/crusader/variants/52460065/August-TV-Console-D4.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1624960651/crusader/variants/52460065/August-TV-Console-D9.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1624960649/crusader/variants/52460065/August-TV-Console-D6.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1624960645/crusader/variants/52460065/August-TV-Console-D2.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1624960648/crusader/variants/52460065/August-TV-Console-D5.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1624960650/crusader/variants/52460065/August-TV-Console-D8.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1624960647/crusader/variants/52460065/August-TV-Console-D3.jpg"
      }
],
    sales_channels: sales_channels.map(({ id }) => ({ id })),
    options: [
      {
        title: "Default",
        values: [
        "Default"
        ]
      }
    ],
    variants: [
      {
        title: "August TV Console, 180cm",
        sku: "52460085",
        options: {
          "Default": "Default"
},
        manage_inventory: false,
        prices: [
          {
            amount: 149900,
            currency_code: 'usd',
          },
          {
            amount: 149900,
            currency_code: 'usd',
            region_id,
          },
        ],
      },
      {
        title: "August TV Console, 180cm",
        sku: "52460065",
        options: {
          "Default": "Default"
},
        manage_inventory: false,
        prices: [
          {
            amount: 149900,
            currency_code: 'usd',
          },
          {
            amount: 149900,
            currency_code: 'usd',
            region_id,
          },
        ],
      }
    ],
  },
  {
    title: "Madison 3 Seater Sofa",
    description: "Biscuit tufting that stays firm and holds its shape, with Performance fabric that stands up to spills, Madison is built for lasting comfort—perfect for long chats or sneaking in an extra-long coffee break.",
    handle: "madison-3-seater-sofa",
    status: ProductStatus.PUBLISHED,
    thumbnail: "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1646386187/crusader/variants/50440750-AM4001/Madison-3-Seater-Sofa-Bisque-Front-SG.png",
    shipping_profile_id,
    category_ids: [categories.find(c => c.name === "3 Seater Sofas")?.id, categories.find(c => c.name === "Sofa & Armchairs")?.id].filter(Boolean),
    tag_ids: [tags.find(t => t.value === "bestsellers")?.id, tags.find(t => t.value === "storewide_sale")?.id, tags.find(t => t.value === "earth_day")?.id, tags.find(t => t.value === "small_living_room_furniture")?.id, tags.find(t => t.value === "small_space_furniture")?.id, tags.find(t => t.value === "all furniture excluding accessories\t")?.id, tags.find(t => t.value === "storewide exclude beige covers")?.id, tags.find(t => t.value === "gss event storewide sale excluding gwp")?.id, tags.find(t => t.value === "all product excluding customisation")?.id, tags.find(t => t.value === "match & save")?.id, tags.find(t => t.value === "all products")?.id, tags.find(t => t.value === "style_midcenturymodern")?.id, tags.find(t => t.value === "s3_event (do not use)")?.id, tags.find(t => t.value === "rounded_furniture")?.id, tags.find(t => t.value === "all_sofa")?.id, tags.find(t => t.value === "holiday")?.id].filter(Boolean),
    collection_id: collections.find(c => c.title === "Madison Collection")?.id,
    images: [
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1646386187/crusader/variants/50440750-AM4001/Madison-3-Seater-Sofa-Bisque-Front-SG.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1646386187/crusader/variants/50440750-AM4001/Madison-3-Seater-Sofa-Bisque-Angle-SG.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1645670446/crusader/variants/50440728-AM4001/Madison-3-Seater-Sofa-Bisque-Side.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1743557693/crusader/variants/50440750-AM4001/Madison-3-Seater-Sofa-Bisque-Back-SG-1743557690.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1645670813/crusader/variants/50440728-AM4001/Madison-3-Seater-Sofa-Bisque-Square-Set_5.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1645688196/crusader/variants/50440728-AM4001/Madison-Sofa-Collection-Bisque-Square-Set_1.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1716790934/crusader/variants/50440728-AM4001/Owen-Sofa-Headrest-Opal-Beige-Square-Det_10-1716790934.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1645670873/crusader/variants/50440728-AM4001/Madison-3-Seater-Sofa-Bisque-Square-Det_4.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1645670873/crusader/variants/50440728-AM4001/Madison-3-Seater-Sofa-Bisque-Square-Det_2.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1645670873/crusader/variants/50440728-AM4001/Madison-3-Seater-Sofa-Bisque-Square-Det_5.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1645670872/crusader/variants/50440728-AM4001/Madison-3-Seater-Sofa-Bisque-Square-Det_3.jpg"
      }
],
    sales_channels: sales_channels.map(({ id }) => ({ id })),
    options: [
      {
        title: "Material",
        values: [
        "Bisque",
        "Camille, Forest",
        "Stone"
        ]
      }
    ],
    variants: [
      {
        title: "Madison 3 Seater Sofa, Bisque",
        sku: "50440750-AM4001",
        options: {
          "Material": "Bisque"
},
        manage_inventory: false,
        prices: [
          {
            amount: 119900,
            currency_code: 'usd',
          },
          {
            amount: 119900,
            currency_code: 'usd',
            region_id,
          },
        ],
      },
      {
        title: "Madison 3 Seater Sofa, Stone",
        sku: "50440750-TW4002",
        options: {
          "Material": "Stone"
},
        manage_inventory: false,
        prices: [
          {
            amount: 107900,
            currency_code: 'usd',
          },
          {
            amount: 107900,
            currency_code: 'usd',
            region_id,
          },
        ],
      },
      {
        title: "Madison 3 Seater Sofa, (Camille) Forest",
        sku: "50440750-CM4001",
        options: {
          "Material": "Camille, Forest"
},
        manage_inventory: false,
        prices: [
          {
            amount: 119900,
            currency_code: 'usd',
          },
          {
            amount: 119900,
            currency_code: 'usd',
            region_id,
          },
        ],
      }
    ],
  },
  {
    title: "Sierra Outdoor Coffee Table Cover",
    description: "Perfectly tailored to fit your outdoor furniture, these covers are durable and made to weather the elements.",
    handle: "sierra-outdoor-coffee-table-cover",
    status: ProductStatus.PUBLISHED,
    thumbnail: "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709284814/crusader/variants/50440922-IV/Sierra-Outdoor-Coffee-Table-Cover-Angle-ivory-1709284811.png",
    shipping_profile_id,
    category_ids: [categories.find(c => c.name === "Outdoor")?.id, categories.find(c => c.name === "Outdoor Furniture Covers")?.id].filter(Boolean),
    tag_ids: [tags.find(t => t.value === "storewide_sale")?.id, tags.find(t => t.value === "all furniture excluding accessories\t")?.id, tags.find(t => t.value === "storewide exclude beige covers")?.id, tags.find(t => t.value === "all products")?.id, tags.find(t => t.value === "gss event storewide sale excluding gwp")?.id, tags.find(t => t.value === "all product excluding customisation")?.id, tags.find(t => t.value === "match & save")?.id].filter(Boolean),
    collection_id: collections.find(c => c.title === "Sierra Outdoor Collection")?.id,
    images: [
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709284814/crusader/variants/50440922-IV/Sierra-Outdoor-Coffee-Table-Cover-Angle-ivory-1709284811.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709288816/crusader/variants/50440922-IV/Redesign-Sierra-Coffee-Table-Cover_1-1709288814.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1695019330/crusader/variants/50440848-IV/Outdoor-Fabric_New_1_US-1695019329.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1708418410/crusader/variants/50440884-IV/Outdoor-Fabric_New-1708418407.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691118112/crusader/variants/50440845-IV/Sierra-Outdoor-Sofa-Cover-Sketch-Map-AU-1691118110.jpg"
      }
],
    sales_channels: sales_channels.map(({ id }) => ({ id })),
    options: [
      {
        title: "Material",
        values: [
        "Ivory"
        ]
      }
    ],
    variants: [
      {
        title: "Sierra Outdoor Coffee Table Cover, Ivory",
        sku: "50440922-IV",
        options: {
          "Material": "Ivory"
},
        manage_inventory: false,
        prices: [
          {
            amount: 6000,
            currency_code: 'usd',
          },
          {
            amount: 6000,
            currency_code: 'usd',
            region_id,
          },
        ],
      }
    ],
  },
  {
    title: "Sierra Outdoor Right Facing 2 Seater Sofa",
    description: "Framed with refined and durable elements, Sierra delivers breezy outdoor living with charm and comfort.",
    handle: "sierra-outdoor-right-facing-2-seater-sofa",
    status: ProductStatus.PUBLISHED,
    thumbnail: "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709274106/crusader/variants/50720011-CO4001/Redesign-Sierra-Right-Facing-2-Seater-Sofa_-Front-1709274104.png",
    shipping_profile_id,
    category_ids: [categories.find(c => c.name === "Outdoor")?.id, categories.find(c => c.name === "Outdoor Modular 2-Seater Sofas")?.id].filter(Boolean),
    tag_ids: [tags.find(t => t.value === "storewide_sale")?.id, tags.find(t => t.value === "all furniture excluding accessories\t")?.id, tags.find(t => t.value === "storewide exclude beige covers")?.id, tags.find(t => t.value === "beige cover fur")?.id, tags.find(t => t.value === "all products")?.id, tags.find(t => t.value === "gss event storewide sale excluding gwp")?.id, tags.find(t => t.value === "all product excluding customisation")?.id, tags.find(t => t.value === "match & save")?.id].filter(Boolean),
    collection_id: collections.find(c => c.title === "Sierra Outdoor Collection")?.id,
    images: [
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709274106/crusader/variants/50720011-CO4001/Redesign-Sierra-Right-Facing-2-Seater-Sofa_-Front-1709274104.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709274107/crusader/variants/50720011-CO4001/Redesign-Sierra-Right-Facing-2-Seater-Sofa_-Angle-1709274104.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709274106/crusader/variants/50720011-CO4001/Redesign-Sierra-Right-Facing-2-Seater-Sofa_-Side-1709274104.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709274106/crusader/variants/50720011-CO4001/Redesign-Sierra-Right-Facing-2-Seater-Sofa_-Back-1709274104.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709798070/crusader/variants/50720009-CO4001/Redesign-Sierra-3-Seater-Sofa-Copy-1709798063.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709274709/crusader/variants/50720011-CO4001/Redesign-Sierra-3-Seater-Sofa-Det_3-1709274702.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709274709/crusader/variants/50720011-CO4001/Redesign-Sierra-3-Seater-Sofa-Det_8-1709274702.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709274709/crusader/variants/50720011-CO4001/Redesign-Sierra-3-Seater-Sofa-Det_9-1709274702.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709274704/crusader/variants/50720011-CO4001/Redesign-Sierra-3-Seater-Sofa-Det_11-1709274702.jpg"
      }
],
    sales_channels: sales_channels.map(({ id }) => ({ id })),
    options: [
      {
        title: "Cover",
        values: [
        "Add Ivory Cover",
        "No Cover"
        ]
      },
      {
        title: "Material",
        values: [
        "Straw"
        ]
      }
    ],
    variants: [
      {
        title: "Sierra Outdoor Right Facing 2 Seater Sofa, Straw",
        sku: "50720011-CO4001",
        options: {
          "Cover": "No Cover",
          "Material": "Straw"
},
        manage_inventory: false,
        prices: [
          {
            amount: 109900,
            currency_code: 'usd',
          },
          {
            amount: 109900,
            currency_code: 'usd',
            region_id,
          },
        ],
      },
      {
        title: "Sierra Outdoor Right Facing 2 Seater Sofa with Ivory Cover, Straw",
        sku: "AS-000518-CO4001",
        options: {
          "Cover": "Add Ivory Cover",
          "Material": "Straw"
},
        manage_inventory: false,
        prices: [
          {
            amount: 119900,
            currency_code: 'usd',
          },
          {
            amount: 119900,
            currency_code: 'usd',
            region_id,
          },
        ],
      }
    ],
  },
  {
    title: "Sawyer TV Console",
    description: "Sawyer delivers visually contrasting tones framed with sleek lines. Doors open to reveal ample storage with adjustable shelves.",
    handle: "sawyer-tv-console-200cm",
    status: ProductStatus.PUBLISHED,
    thumbnail: "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1673927310/crusader/variants/50220001/Sawyer-TV-Console-Angle-1673927308.png",
    shipping_profile_id,
    category_ids: [categories.find(c => c.name === "TV Consoles")?.id, categories.find(c => c.name === "Storage")?.id].filter(Boolean),
    tag_ids: [tags.find(t => t.value === "bestsellers")?.id, tags.find(t => t.value === "storewide_sale")?.id, tags.find(t => t.value === "all furniture excluding accessories\t")?.id, tags.find(t => t.value === "storewide exclude beige covers")?.id, tags.find(t => t.value === "gss event storewide sale excluding gwp")?.id, tags.find(t => t.value === "all product excluding customisation")?.id, tags.find(t => t.value === "match & save")?.id, tags.find(t => t.value === "all_tv_stands")?.id, tags.find(t => t.value === "highlight")?.id, tags.find(t => t.value === "all products")?.id, tags.find(t => t.value === "roz_1")?.id, tags.find(t => t.value === "style_modernfarmhouse")?.id, tags.find(t => t.value === "sofa_bundle_complementary_products")?.id, tags.find(t => t.value === "tv_console")?.id, tags.find(t => t.value === "furniture_with_storage")?.id, tags.find(t => t.value === "minimalist_furniture")?.id, tags.find(t => t.value === "new_arrivals")?.id, tags.find(t => t.value === "s1_2023_skus")?.id].filter(Boolean),
    collection_id: collections.find(c => c.title === "Sawyer Collection")?.id,
    images: [
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1673927310/crusader/variants/50220001/Sawyer-TV-Console-Angle-1673927308.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1675760427/crusader/variants/50220001/Sawyer-TV-Console-Front-1675760425.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1673927310/crusader/variants/50220001/Sawyer-TV-Console-Front_1-1673927308.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1673927310/crusader/variants/50220001/Sawyer-TV-Console-Side-1673927308.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1673927310/crusader/variants/50220001/Sawyer-TV-Console-Back_-1673927308.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1677755596/crusader/variants/50220001/Sawyer-TV-Stand-Square-Set_1-1677755593.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1678342015/crusader/variants/50220001/Sawyer-TV-Stand-Square-Det_2-1678342013.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1679369980/crusader/variants/50220001/Sawyer-Sideboard_Copy-1679369978.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1678341923/crusader/variants/50220001/Sawyer-TV-Stand-Square-Set_2-1678341920.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1676864857/crusader/variants/50220001/Sawyer-Wood-Disclamer-1676864855.jpg"
      }
],
    sales_channels: sales_channels.map(({ id }) => ({ id })),
    options: [
      {
        title: "Default",
        values: [
        "Default"
        ]
      }
    ],
    variants: [
      {
        title: "Sawyer TV Console",
        sku: "50220001",
        options: {
          "Default": "Default"
},
        manage_inventory: false,
        prices: [
          {
            amount: 119900,
            currency_code: 'usd',
          },
          {
            amount: 119900,
            currency_code: 'usd',
            region_id,
          },
        ],
      }
    ],
  },
  {
    title: "Seb Extendable Dining Table, 150-200cm",
    description: "Rustic, homey and thoughtfully crafted, Seb is a mid-century collection made to create warm, cosy spaces.",
    handle: "seb-extendable-dining-table-150-200",
    status: ProductStatus.PUBLISHED,
    thumbnail: "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1623727286/crusader/variants/40550099/Seb-Extendable-Dining-Table-Front_2.png",
    shipping_profile_id,
    category_ids: [categories.find(c => c.name === "Extendable Dining Tables")?.id, categories.find(c => c.name === "Tables")?.id].filter(Boolean),
    tag_ids: [tags.find(t => t.value === "bestsellers")?.id, tags.find(t => t.value === "storewide_sale")?.id, tags.find(t => t.value === "small_table_furniture")?.id, tags.find(t => t.value === "small_space_furniture")?.id, tags.find(t => t.value === "all furniture excluding accessories\t")?.id, tags.find(t => t.value === "storewide exclude beige covers")?.id, tags.find(t => t.value === "gss event storewide sale excluding gwp")?.id, tags.find(t => t.value === "all product excluding customisation")?.id, tags.find(t => t.value === "match & save")?.id, tags.find(t => t.value === "all_indoor_dining_table")?.id, tags.find(t => t.value === "all products")?.id, tags.find(t => t.value === "acacia_wood")?.id, tags.find(t => t.value === "style_midcenturymodern")?.id, tags.find(t => t.value === "rounded_furniture")?.id, tags.find(t => t.value === "all_dining_table")?.id, tags.find(t => t.value === "holiday")?.id, tags.find(t => t.value === "web_ar")?.id, tags.find(t => t.value === "coastal")?.id, tags.find(t => t.value === "modern_farmhouse")?.id, tags.find(t => t.value === "extendable_dining_tables")?.id, tags.find(t => t.value === "midcenturymodern")?.id, tags.find(t => t.value === "spring")?.id, tags.find(t => t.value === "bestselling")?.id, tags.find(t => t.value === "2020withcastlery")?.id].filter(Boolean),
    collection_id: collections.find(c => c.title === "Seb Collection")?.id,
    images: [
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1623727286/crusader/variants/40550099/Seb-Extendable-Dining-Table-Front_2.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1623727285/crusader/variants/40550099/Seb-Extendable-Dining-Table-Front_1.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1623727284/crusader/variants/40550099/Seb-Extendable-Dining-Table-Angle_1.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1623727287/crusader/variants/40550099/Seb-Extendable-Dining-Table-Front_3.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1623727284/crusader/variants/40550099/Seb-Extendable-Dining-Table-Angle_2.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1623727288/crusader/variants/40550099/Seb-Extendable-Dining-Table-Side_2.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1639132600/crusader/variants/40550099/Seb-Extendable-Dining-Table-Set_1.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1624967127/crusader/variants/40550099/Seb-Dining-Table-Set1.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1624967129/crusader/variants/40550099/Seb-Dining-Table-Det5.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1624967129/crusader/variants/40550099/Seb-Dining-Table-Det4.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1680487447/crusader/variants/40550099/Seb-Extendable-Dining-Table-Det_2-1680487444.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1624967128/crusader/variants/40550099/Seb-Dining-Table-Det3.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1631772569/crusader/variants/40550099/Seb-texture.jpg"
      }
],
    sales_channels: sales_channels.map(({ id }) => ({ id })),
    options: [
      {
        title: "Default",
        values: [
        "Default"
        ]
      }
    ],
    variants: [
      {
        title: "Seb Extendable Dining Table, 150-200cm",
        sku: "40550099",
        options: {
          "Default": "Default"
},
        manage_inventory: false,
        prices: [
          {
            amount: 109900,
            currency_code: 'usd',
          },
          {
            amount: 109900,
            currency_code: 'usd',
            region_id,
          },
        ],
      }
    ],
  },
  {
    title: "Dawson 3 Seater Sofa",
    description: "Light and airy with feather-filled cushions, the Dawson's appearance is aligned with the cloud-like lounge experience it offers.",
    handle: "dawson-3-seater-sofa",
    status: ProductStatus.PUBLISHED,
    thumbnail: "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1634716861/crusader/variants/T50440986-NG4001/Dawson-3-Seater-Sofa-Beach-Linen-Front.png",
    shipping_profile_id,
    category_ids: [categories.find(c => c.name === "3 Seater Sofas")?.id, categories.find(c => c.name === "Sofa & Armchairs")?.id].filter(Boolean),
    tag_ids: [tags.find(t => t.value === "bestsellers")?.id, tags.find(t => t.value === "storewide_sale")?.id, tags.find(t => t.value === "small_living_room_furniture")?.id, tags.find(t => t.value === "small_space_furniture")?.id, tags.find(t => t.value === "all furniture excluding accessories\t")?.id, tags.find(t => t.value === "storewide exclude beige covers")?.id, tags.find(t => t.value === "gss event storewide sale excluding gwp")?.id, tags.find(t => t.value === "all product excluding customisation")?.id, tags.find(t => t.value === "match & save")?.id, tags.find(t => t.value === "all products")?.id, tags.find(t => t.value === "style_moderncontemporary")?.id, tags.find(t => t.value === "s3_event (do not use)")?.id, tags.find(t => t.value === "all_sofa")?.id].filter(Boolean),
    collection_id: collections.find(c => c.title === "Dawson Collection")?.id,
    images: [
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1634716861/crusader/variants/T50440986-NG4001/Dawson-3-Seater-Sofa-Beach-Linen-Front.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1634716861/crusader/variants/T50440986-NG4001/Dawson-3-Seater-Sofa-Beach-Linen-Angle.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1634716860/crusader/variants/T50440986-NG4001/Dawson-3-Seater-Sofa-Beach-Linen-Side.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1634716879/crusader/variants/T50440986-NG4001/Dawson-3-Seater-Sofa-Beach-Linen-Back.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1640249245/crusader/variants/T50440986-NG4001/Dawson-Sofa-With-Ottoman-Beach-Linen-Square-Set_5.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1706000281/crusader/variants/AS-000374-NG4001/Dawson-3-Seater-Sofa-With-Armchair-With-Ottoman-Seagull-Square-Set_2-1706000280.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1702897677/crusader/variants/AS-000374-NG4001/Dawson-Extended-Sofa-With-Ottoman-Beach-Linen-Set_1-1702897677.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1702897677/crusader/variants/AS-000374-NG4001/Dawson-Swivel-Armchair-Copy-1702897677.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1716861123/crusader/variants/AS-000227-NG4001/Sofa-Armrest-Table-Natural-Square-Set_4-1716861123.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1641546342/crusader/variants/T50440986-NG4001/Dawson-Chaise-Sectional-Sofa-Beach-Linen-Det_1.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1634714309/crusader/variants/54000042-NG4001/Dawson-Sofa-Beach-Linen-Square-Det_2.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1634714194/crusader/variants/54000042-NG4001/Dawson-Sofa-Beach-Linen-Square-Det_4.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1634714178/crusader/variants/54000042-NG4001/Dawson-Sofa-Beach-Linen-Square-Det_8.jpg"
      }
],
    sales_channels: sales_channels.map(({ id }) => ({ id })),
    options: [
      {
        title: "Frame cover",
        values: [
        "Removable"
        ]
      },
      {
        title: "Material",
        values: [
        "Beach Linen",
        "Charcoal Grey",
        "Indigo Blue",
        "Olive Gold Velvet",
        "Pearl Beige",
        "Performance Brilliant White",
        "Performance Creamy White",
        "Performance Cumin",
        "Performance Dove Grey",
        "Performance Ginger",
        "Performance Ivory",
        "Performance Moss",
        "Performance Smoke Grey",
        "Performance White Quartz Bouclé",
        "Seagull"
        ]
      }
    ],
    variants: [
      {
        title: "Dawson 3 Seater Sofa, Beach Linen",
        sku: "AS-000374-NG4001",
        options: {
          "Frame cover": "Removable",
          "Material": "Beach Linen"
},
        manage_inventory: false,
        prices: [
          {
            amount: 189800,
            currency_code: 'usd',
          },
          {
            amount: 189800,
            currency_code: 'usd',
            region_id,
          },
        ],
      },
      {
        title: "Dawson 3 Seater Sofa, Seagull",
        sku: "AS-000374-NG4002",
        options: {
          "Frame cover": "Removable",
          "Material": "Seagull"
},
        manage_inventory: false,
        prices: [
          {
            amount: 189800,
            currency_code: 'usd',
          },
          {
            amount: 189800,
            currency_code: 'usd',
            region_id,
          },
        ],
      },
      {
        title: "Dawson 3 Seater Sofa Customized, (Twill) Charcoal Grey",
        sku: "AS-000374C-TL4003",
        options: {
          "Frame cover": "Removable",
          "Material": "Charcoal Grey"
},
        manage_inventory: false,
        prices: [
          {
            amount: 211800,
            currency_code: 'usd',
          },
          {
            amount: 211800,
            currency_code: 'usd',
            region_id,
          },
        ],
      },
      {
        title: "Dawson 3 Seater Sofa Customized, (Velluto) Olive Gold",
        sku: "AS-000374C-VL4014",
        options: {
          "Frame cover": "Removable",
          "Material": "Olive Gold Velvet"
},
        manage_inventory: false,
        prices: [
          {
            amount: 205800,
            currency_code: 'usd',
          },
          {
            amount: 205800,
            currency_code: 'usd',
            region_id,
          },
        ],
      },
      {
        title: "Dawson 3 Seater Sofa Customized, (Twill) Indigo Blue",
        sku: "AS-000374C-TL4001",
        options: {
          "Frame cover": "Removable",
          "Material": "Indigo Blue"
},
        manage_inventory: false,
        prices: [
          {
            amount: 211800,
            currency_code: 'usd',
          },
          {
            amount: 211800,
            currency_code: 'usd',
            region_id,
          },
        ],
      },
      {
        title: "Dawson 3 Seater Sofa Customized, (Twill) Pearl Beige",
        sku: "AS-000374C-TL4002",
        options: {
          "Frame cover": "Removable",
          "Material": "Pearl Beige"
},
        manage_inventory: false,
        prices: [
          {
            amount: 211800,
            currency_code: 'usd',
          },
          {
            amount: 211800,
            currency_code: 'usd',
            region_id,
          },
        ],
      },
      {
        title: "Dawson 3 Seater Sofa Customized, (Performance Marcel) Brilliant White",
        sku: "AS-000374C-PM4002",
        options: {
          "Frame cover": "Removable",
          "Material": "Performance Brilliant White"
},
        manage_inventory: false,
        prices: [
          {
            amount: 211800,
            currency_code: 'usd',
          },
          {
            amount: 211800,
            currency_code: 'usd',
            region_id,
          },
        ],
      },
      {
        title: "Dawson 3 Seater Sofa Customized, (Performance Peyton) Ivory",
        sku: "AS-000374C-PY4001",
        options: {
          "Frame cover": "Removable",
          "Material": "Performance Ivory"
},
        manage_inventory: false,
        prices: [
          {
            amount: 211800,
            currency_code: 'usd',
          },
          {
            amount: 211800,
            currency_code: 'usd',
            region_id,
          },
        ],
      },
      {
        title: "Dawson 3 Seater Sofa Customized, (Performance Peyton) Dove Grey",
        sku: "AS-000374C-PY4002",
        options: {
          "Frame cover": "Removable",
          "Material": "Performance Dove Grey"
},
        manage_inventory: false,
        prices: [
          {
            amount: 211800,
            currency_code: 'usd',
          },
          {
            amount: 211800,
            currency_code: 'usd',
            region_id,
          },
        ],
      },
      {
        title: "Dawson 3 Seater Sofa Customized, (Performance Marcel) Smoke Grey",
        sku: "AS-000374C-PM4001",
        options: {
          "Frame cover": "Removable",
          "Material": "Performance Smoke Grey"
},
        manage_inventory: false,
        prices: [
          {
            amount: 211800,
            currency_code: 'usd',
          },
          {
            amount: 211800,
            currency_code: 'usd',
            region_id,
          },
        ],
      },
      {
        title: "Dawson 3 Seater Sofa Customized, (Performance Peyton) Moss",
        sku: "AS-000374C-PY4003",
        options: {
          "Frame cover": "Removable",
          "Material": "Performance Moss"
},
        manage_inventory: false,
        prices: [
          {
            amount: 211800,
            currency_code: 'usd',
          },
          {
            amount: 211800,
            currency_code: 'usd',
            region_id,
          },
        ],
      },
      {
        title: "Dawson 3 Seater Sofa Customized, (Performance Twill) Creamy White",
        sku: "AS-000374C-PT4001",
        options: {
          "Frame cover": "Removable",
          "Material": "Performance Creamy White"
},
        manage_inventory: false,
        prices: [
          {
            amount: 211800,
            currency_code: 'usd',
          },
          {
            amount: 211800,
            currency_code: 'usd',
            region_id,
          },
        ],
      },
      {
        title: "Dawson 3 Seater Sofa Customized, (Performance Peyton) Cumin",
        sku: "AS-000374C-PY4004",
        options: {
          "Frame cover": "Removable",
          "Material": "Performance Cumin"
},
        manage_inventory: false,
        prices: [
          {
            amount: 211800,
            currency_code: 'usd',
          },
          {
            amount: 211800,
            currency_code: 'usd',
            region_id,
          },
        ],
      },
      {
        title: "Dawson 3 Seater Sofa Customized, (Performance Infinity) Ginger",
        sku: "AS-000374C-IN4003",
        options: {
          "Frame cover": "Removable",
          "Material": "Performance Ginger"
},
        manage_inventory: false,
        prices: [
          {
            amount: 217800,
            currency_code: 'usd',
          },
          {
            amount: 217800,
            currency_code: 'usd',
            region_id,
          },
        ],
      },
      {
        title: "Dawson 3 Seater Sofa Customized, (Performance Infinity) White Quartz",
        sku: "AS-000374C-IN4002",
        options: {
          "Frame cover": "Removable",
          "Material": "Performance White Quartz Bouclé"
},
        manage_inventory: false,
        prices: [
          {
            amount: 217800,
            currency_code: 'usd',
          },
          {
            amount: 217800,
            currency_code: 'usd',
            region_id,
          },
        ],
      }
    ],
  },
  {
    title: "Madison Leather 3 Seater Sofa",
    description: "Madison is a quintessential mid-century modern sofa with classic biscuit tufting, round bolsters and tapered legs.",
    handle: "madison-leather-3-seater-sofa",
    status: ProductStatus.PUBLISHED,
    thumbnail: "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1631157536/crusader/variants/50440750-LE4016/Madison-3-Seater-Sofa-Caramel-Front.png",
    shipping_profile_id,
    category_ids: [categories.find(c => c.name === "3 Seater Sofas")?.id, categories.find(c => c.name === "Sofa & Armchairs")?.id].filter(Boolean),
    tag_ids: [tags.find(t => t.value === "storewide_sale")?.id, tags.find(t => t.value === "small_living_room_furniture")?.id, tags.find(t => t.value === "small_space_furniture")?.id, tags.find(t => t.value === "all furniture excluding accessories\t")?.id, tags.find(t => t.value === "storewide exclude beige covers")?.id, tags.find(t => t.value === "gss event storewide sale excluding gwp")?.id, tags.find(t => t.value === "all product excluding customisation")?.id, tags.find(t => t.value === "match & save")?.id, tags.find(t => t.value === "all products")?.id, tags.find(t => t.value === "style_midcenturymodern")?.id, tags.find(t => t.value === "s3_event (do not use)")?.id, tags.find(t => t.value === "all_sofa")?.id, tags.find(t => t.value === "icu_list")?.id, tags.find(t => t.value === "holiday")?.id, tags.find(t => t.value === "midcenturymodern")?.id].filter(Boolean),
    collection_id: collections.find(c => c.title === "Madison Collection")?.id,
    images: [
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1631157536/crusader/variants/50440750-LE4016/Madison-3-Seater-Sofa-Caramel-Front.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1631157809/crusader/variants/50440750-LE4016/Madison-3-Seater-Sofa-Caramel-Angle.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1631157921/crusader/variants/50440750-LE4016/Madison-3-Seater-Sofa-Caramel-Side.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1631157930/crusader/variants/50440750-LE4016/Madison-3-Seater-Sofa-Caramel-Back.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1631157511/crusader/variants/50440750-LE4016/Madison-Leather-3-Seater-Sofa-Caramel-Lifestyle-Crop.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1631157610/crusader/variants/50440750-LE4016/Madison-3-Seater-Sofa-Caramel-Square-Set_4.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1716790130/crusader/variants/50440728-LE4016/Owen-Sofa-Headrest-Opal-Beige-Square-Det_10-1716790129.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1680854820/crusader/variants/50440728-LE4016/Madison-Sofa-Lunar-New-Year-Campaign-Square-Set_13-1680854820.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1632991501/crusader/variants/50440750-LE4016/Jonathan-Texture.jpg"
      }
],
    sales_channels: sales_channels.map(({ id }) => ({ id })),
    options: [
      {
        title: "Material",
        values: [
        "Caramel"
        ]
      }
    ],
    variants: [
      {
        title: "Madison Leather 3 Seater Sofa, Caramel",
        sku: "50440750-LE4016",
        options: {
          "Material": "Caramel"
},
        manage_inventory: false,
        prices: [
          {
            amount: 199900,
            currency_code: 'usd',
          },
          {
            amount: 199900,
            currency_code: 'usd',
            region_id,
          },
        ],
      }
    ],
  },
  {
    title: "Jonathan Left Chaise",
    description: "High in comfort and versatility, the Jonathan's boxy and low-to-the-ground silhouette make it the perfect anchor for any living room -- no matter the interior style.",
    handle: "jonathan-left-chaise",
    status: ProductStatus.PUBLISHED,
    thumbnail: "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1684203626/crusader/variants/54000098-PT4001/Jonathan-Left-Chaise-Sofa-Creamy-White-Front-1684203624.png",
    shipping_profile_id,
    category_ids: [categories.find(c => c.name === "Modular Chaises")?.id, categories.find(c => c.name === "Sofa & Armchairs")?.id].filter(Boolean),
    tag_ids: [tags.find(t => t.value === "bestsellers")?.id, tags.find(t => t.value === "storewide_sale")?.id, tags.find(t => t.value === "all furniture excluding accessories\t")?.id, tags.find(t => t.value === "storewide exclude beige covers")?.id, tags.find(t => t.value === "gss event storewide sale excluding gwp")?.id, tags.find(t => t.value === "all product excluding customisation")?.id, tags.find(t => t.value === "match & save")?.id, tags.find(t => t.value === "all products")?.id, tags.find(t => t.value === "modular_sofas")?.id, tags.find(t => t.value === "style_moderncontemporary")?.id, tags.find(t => t.value === "u_c_shaped_sofa")?.id, tags.find(t => t.value === "all_sofa")?.id].filter(Boolean),
    collection_id: collections.find(c => c.title === "Jonathan Collection")?.id,
    images: [
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1684203626/crusader/variants/54000098-PT4001/Jonathan-Left-Chaise-Sofa-Creamy-White-Front-1684203624.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1684203670/crusader/variants/54000098-PT4001/Jonathan-Left-Chaise-Sofa-Creamy-White-Angle-1684203668.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1681976227/crusader/variants/54000098-PT4001/Jonathan-Left-Chaise-Sofa-Creamy-White-Side-1681976224.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1684203587/crusader/variants/54000098-PT4001/Jonathan-Left-Chaise-Sofa-Creamy-White-Back-1684203584.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1682046879/crusader/variants/54000098-PT4001/Jonathan-Extended-Side-Left-Chaise-Sofa-Creamy-White-Square-Det_2-1682046877.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1682046879/crusader/variants/54000098-PT4001/Jonathan-Side-Chaise-Sofa-Creamy-White-Square-Set_1_1-1682046877.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1683276724/crusader/variants/54000098-PT4001/Jonathan-Extended-Side-Left-Chaise-Sectional-Sofa-Creamy-White-Square-Set_4-1683276721.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1681976279/crusader/variants/54000098-PT4001/Jonathan-Side-Right-Chaise-Sofa-Creamy-White-Det_1-1681976276.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1683276849/crusader/variants/54000098-PT4001/Jonathan-Side-Right-Chaise-Sofa-Creamy-White-Det_2-1683276847.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1681976278/crusader/variants/54000098-PT4001/Jonathan-Side-Right-Chaise-Sofa-Creamy-White-Det_5-1681976276.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1681976408/crusader/variants/54000098-PT4001/Jonathan-Side-Right-Chaise-Sofa-Creamy-White-Det_6-1681976405.jpg"
      }
],
    sales_channels: sales_channels.map(({ id }) => ({ id })),
    options: [
      {
        title: "Material",
        values: [
        "Charcoal Grey",
        "Dark Granite",
        "Frost White",
        "Indigo Blue",
        "Light Blush",
        "Nickel Grey",
        "Olive Gold Velvet",
        "Pearl Beige",
        "Performance Brilliant White",
        "Performance Creamy White",
        "Performance Cumin",
        "Performance Dove Grey",
        "Performance Ginger",
        "Performance Ivory",
        "Performance Moss",
        "Performance Smoke Grey",
        "Performance White Quartz Bouclé",
        "Zenith Blue"
        ]
      }
    ],
    variants: [
      {
        title: "Jonathan Left Chaise, Performance Creamy White",
        sku: "54000098-PT4001",
        options: {
          "Material": "Performance Creamy White"
},
        manage_inventory: false,
        prices: [
          {
            amount: 94900,
            currency_code: 'usd',
          },
          {
            amount: 94900,
            currency_code: 'usd',
            region_id,
          },
        ],
      },
      {
        title: "Jonathan Left Chaise, Zenith Blue",
        sku: "54000098-GI4001",
        options: {
          "Material": "Zenith Blue"
},
        manage_inventory: false,
        prices: [
          {
            amount: 89900,
            currency_code: 'usd',
          },
          {
            amount: 89900,
            currency_code: 'usd',
            region_id,
          },
        ],
      },
      {
        title: "Jonathan Left Chaise, Dark Granite",
        sku: "54000098-GI4002",
        options: {
          "Material": "Dark Granite"
},
        manage_inventory: false,
        prices: [
          {
            amount: 89900,
            currency_code: 'usd',
          },
          {
            amount: 89900,
            currency_code: 'usd',
            region_id,
          },
        ],
      },
      {
        title: "Jonathan Left Chaise Customized, (Twill) Charcoal Grey",
        sku: "54000098C-TL4003",
        options: {
          "Material": "Charcoal Grey"
},
        manage_inventory: false,
        prices: [
          {
            amount: 99900,
            currency_code: 'usd',
          },
          {
            amount: 99900,
            currency_code: 'usd',
            region_id,
          },
        ],
      },
      {
        title: "Jonathan Left Chaise Customized, (velluto) Olive Gold",
        sku: "54000098C-VL4014",
        options: {
          "Material": "Olive Gold Velvet"
},
        manage_inventory: false,
        prices: [
          {
            amount: 96900,
            currency_code: 'usd',
          },
          {
            amount: 96900,
            currency_code: 'usd',
            region_id,
          },
        ],
      },
      {
        title: "Jonathan Left Chaise Customized, (Twill) Indigo Blue",
        sku: "54000098C-TL4001",
        options: {
          "Material": "Indigo Blue"
},
        manage_inventory: false,
        prices: [
          {
            amount: 99900,
            currency_code: 'usd',
          },
          {
            amount: 99900,
            currency_code: 'usd',
            region_id,
          },
        ],
      },
      {
        title: "Jonathan Left Chaise Customized, (Cheyenne) Light Blush",
        sku: "54000098C-CY4003",
        options: {
          "Material": "Light Blush"
},
        manage_inventory: false,
        prices: [
          {
            amount: 99900,
            currency_code: 'usd',
          },
          {
            amount: 99900,
            currency_code: 'usd',
            region_id,
          },
        ],
      },
      {
        title: "Jonathan Left Chaise Customized, (Cheyenne) Frost White",
        sku: "54000098C-CY4001",
        options: {
          "Material": "Frost White"
},
        manage_inventory: false,
        prices: [
          {
            amount: 99900,
            currency_code: 'usd',
          },
          {
            amount: 99900,
            currency_code: 'usd',
            region_id,
          },
        ],
      },
      {
        title: "Jonathan Left Chaise Customized, (Twill) Pearl Beige",
        sku: "54000098C-TL4002",
        options: {
          "Material": "Pearl Beige"
},
        manage_inventory: false,
        prices: [
          {
            amount: 99900,
            currency_code: 'usd',
          },
          {
            amount: 99900,
            currency_code: 'usd',
            region_id,
          },
        ],
      },
      {
        title: "Jonathan Left Chaise Customized, (Performance Marcel) Brilliant White",
        sku: "54000098C-PM4002",
        options: {
          "Material": "Performance Brilliant White"
},
        manage_inventory: false,
        prices: [
          {
            amount: 99900,
            currency_code: 'usd',
          },
          {
            amount: 99900,
            currency_code: 'usd',
            region_id,
          },
        ],
      },
      {
        title: "Jonathan Left Chaise Customized, (Cheyenne) Nickel Grey",
        sku: "54000098C-CY4002",
        options: {
          "Material": "Nickel Grey"
},
        manage_inventory: false,
        prices: [
          {
            amount: 99900,
            currency_code: 'usd',
          },
          {
            amount: 99900,
            currency_code: 'usd',
            region_id,
          },
        ],
      },
      {
        title: "Jonathan Left Chaise Customized, (Performance Peyton) Ivory",
        sku: "54000098C-PY4001",
        options: {
          "Material": "Performance Ivory"
},
        manage_inventory: false,
        prices: [
          {
            amount: 99900,
            currency_code: 'usd',
          },
          {
            amount: 99900,
            currency_code: 'usd',
            region_id,
          },
        ],
      },
      {
        title: "Jonathan Left Chaise Customized, (Performance Peyton) Dove Grey",
        sku: "54000098C-PY4002",
        options: {
          "Material": "Performance Dove Grey"
},
        manage_inventory: false,
        prices: [
          {
            amount: 99900,
            currency_code: 'usd',
          },
          {
            amount: 99900,
            currency_code: 'usd',
            region_id,
          },
        ],
      },
      {
        title: "Jonathan Left Chaise Customized, (Performance Marcel) Smoke Grey",
        sku: "54000098C-PM4001",
        options: {
          "Material": "Performance Smoke Grey"
},
        manage_inventory: false,
        prices: [
          {
            amount: 99900,
            currency_code: 'usd',
          },
          {
            amount: 99900,
            currency_code: 'usd',
            region_id,
          },
        ],
      },
      {
        title: "Jonathan Left Chaise Customized, (Performance Peyton) Moss",
        sku: "54000098C-PY4003",
        options: {
          "Material": "Performance Moss"
},
        manage_inventory: false,
        prices: [
          {
            amount: 99900,
            currency_code: 'usd',
          },
          {
            amount: 99900,
            currency_code: 'usd',
            region_id,
          },
        ],
      },
      {
        title: "Jonathan Left Chaise Customized, (Performance Peyton) Cumin",
        sku: "54000098C-PY4004",
        options: {
          "Material": "Performance Cumin"
},
        manage_inventory: false,
        prices: [
          {
            amount: 99900,
            currency_code: 'usd',
          },
          {
            amount: 99900,
            currency_code: 'usd',
            region_id,
          },
        ],
      },
      {
        title: "Jonathan Left Chaise Customized, (Performance Infinity) Ginger",
        sku: "54000098C-IN4003",
        options: {
          "Material": "Performance Ginger"
},
        manage_inventory: false,
        prices: [
          {
            amount: 102900,
            currency_code: 'usd',
          },
          {
            amount: 102900,
            currency_code: 'usd',
            region_id,
          },
        ],
      },
      {
        title: "Jonathan Left Chaise Customized, (Performance Infinity) White Quartz",
        sku: "54000098C-IN4002",
        options: {
          "Material": "Performance White Quartz Bouclé"
},
        manage_inventory: false,
        prices: [
          {
            amount: 102900,
            currency_code: 'usd',
          },
          {
            amount: 102900,
            currency_code: 'usd',
            region_id,
          },
        ],
      }
    ],
  },
  {
    title: "Sloane Dining Bench",
    description: "Characterised by fluted panels, Sloane's removable leather bench cushion makes cleaning up after dinner parties a breeze.",
    handle: "sloane-dining-bench",
    status: ProductStatus.PUBLISHED,
    thumbnail: "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1678698648/crusader/variants/50520005/Sloane-Dining-Bench-150cm-Grey-Oak-With-Leather-Cushion-Angle-1678698646.png",
    shipping_profile_id,
    category_ids: [categories.find(c => c.name === "Chairs & Benches")?.id, categories.find(c => c.name === "Dining Benches")?.id].filter(Boolean),
    tag_ids: [tags.find(t => t.value === "bestsellers")?.id, tags.find(t => t.value === "storewide_sale")?.id, tags.find(t => t.value === "all furniture excluding accessories\t")?.id, tags.find(t => t.value === "storewide exclude beige covers")?.id, tags.find(t => t.value === "gss event storewide sale excluding gwp")?.id, tags.find(t => t.value === "all product excluding customisation")?.id, tags.find(t => t.value === "match & save")?.id, tags.find(t => t.value === "all products")?.id, tags.find(t => t.value === "style_moderncontemporary")?.id, tags.find(t => t.value === "new_arrivals")?.id, tags.find(t => t.value === "s1_2023_skus")?.id].filter(Boolean),
    collection_id: collections.find(c => c.title === "Sloane Collection")?.id,
    images: [
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1678698648/crusader/variants/50520005/Sloane-Dining-Bench-150cm-Grey-Oak-With-Leather-Cushion-Angle-1678698646.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1678698647/crusader/variants/50520005/Sloane-Dining-Bench-150cm-Grey-Oak-With-Leather-Cushion-Front-1678698645.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1678698647/crusader/variants/50520005/Sloane-Dining-Bench-150cm-Grey-Oak-With-Leather-Cushion-Side-1678698645.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1678698647/crusader/variants/50520005/Sloane-Dining-Bench-150cm-Grey-Oak-Angle-1678698645.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1678698647/crusader/variants/50520005/Sloane-Dining-Bench-150cm-Grey-Oak-Side-1678698645.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1678698986/crusader/variants/50520005/Sloane-Dining-Bench-Square-Set_2-1678698984.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1678699006/crusader/variants/50520005/Sloane-Dining-Table-With-Dining-Bench-With-4-Cane-and-Leather-Chair-with-Armrest-Caramel-Black-Square-Set_3-1678699004.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1678699742/crusader/variants/T50441109-LE4016/Sloane-Dining-Bench-Square-Set_1-1678699740.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1678699069/crusader/variants/50520005/Sloane-Dining-Bench-Grey-Oak-Det_2-1678699067.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1678699069/crusader/variants/50520005/Sloane-Dining-Bench-Grey-Oak-Det_1-1678699067.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1678699069/crusader/variants/50520005/Sloane-Dining-Bench-Grey-Oak-Det_4-1678699067.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1678699345/crusader/variants/T50441109-LE4016/Sloane-Dining-Bench-Grey-Oak-Det_5-1678699343.jpg"
      }
],
    sales_channels: sales_channels.map(({ id }) => ({ id })),
    options: [
      {
        title: "Variant",
        values: [
        "No Cushion",
        "with Cushion"
        ]
      },
      {
        title: "Length",
        values: [
        "150cm",
        "180cm"
        ]
      },
      {
        title: "Material",
        values: [
        "Caramel"
        ]
      }
    ],
    variants: [
      {
        title: "Sloane Dining Bench Caramel, 150cm",
        sku: "AS-000297-LE4016",
        options: {
          "Variant": "with Cushion",
          "Length": "150cm",
          "Material": "Caramel"
},
        manage_inventory: false,
        prices: [
          {
            amount: 64900,
            currency_code: 'usd',
          },
          {
            amount: 64900,
            currency_code: 'usd',
            region_id,
          },
        ],
      },
      {
        title: "Sloane Dining Bench Caramel, 180cm",
        sku: "AS-000298-LE4016",
        options: {
          "Variant": "with Cushion",
          "Length": "180cm",
          "Material": "Caramel"
},
        manage_inventory: false,
        prices: [
          {
            amount: 74900,
            currency_code: 'usd',
          },
          {
            amount: 74900,
            currency_code: 'usd',
            region_id,
          },
        ],
      },
      {
        title: "Sloane Dining Bench, 150cm",
        sku: "50520005",
        options: {
          "Variant": "No Cushion",
          "Length": "150cm",
          "Material": "Caramel"
},
        manage_inventory: false,
        prices: [
          {
            amount: 49900,
            currency_code: 'usd',
          },
          {
            amount: 49900,
            currency_code: 'usd',
            region_id,
          },
        ],
      },
      {
        title: "Sloane Dining Bench, 180cm",
        sku: "50520006",
        options: {
          "Variant": "No Cushion",
          "Length": "180cm",
          "Material": "Caramel"
},
        manage_inventory: false,
        prices: [
          {
            amount: 54900,
            currency_code: 'usd',
          },
          {
            amount: 54900,
            currency_code: 'usd',
            region_id,
          },
        ],
      }
    ],
  },
  {
    title: "Jonathan Right Chaise",
    description: "High in comfort and versatility, the Jonathan's boxy and low-to-the-ground silhouette make it the perfect anchor for any living room -- no matter the interior style.",
    handle: "jonathan-right-chaise",
    status: ProductStatus.PUBLISHED,
    thumbnail: "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1684203750/crusader/variants/54000099-PT4001/Jonathan-Right-Chaise-Sofa-Creamy-White-Front-1684203748.png",
    shipping_profile_id,
    category_ids: [categories.find(c => c.name === "Modular Chaises")?.id, categories.find(c => c.name === "Sofa & Armchairs")?.id].filter(Boolean),
    tag_ids: [tags.find(t => t.value === "storewide_sale")?.id, tags.find(t => t.value === "all furniture excluding accessories\t")?.id, tags.find(t => t.value === "storewide exclude beige covers")?.id, tags.find(t => t.value === "gss event storewide sale excluding gwp")?.id, tags.find(t => t.value === "all product excluding customisation")?.id, tags.find(t => t.value === "match & save")?.id, tags.find(t => t.value === "all products")?.id, tags.find(t => t.value === "modular_sofas")?.id, tags.find(t => t.value === "style_moderncontemporary")?.id, tags.find(t => t.value === "all_sofa")?.id].filter(Boolean),
    collection_id: collections.find(c => c.title === "Jonathan Collection")?.id,
    images: [
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1684203750/crusader/variants/54000099-PT4001/Jonathan-Right-Chaise-Sofa-Creamy-White-Front-1684203748.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1684203750/crusader/variants/54000099-PT4001/Jonathan-Right-Chaise-Sofa-Creamy-White-Angle-1684203748.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1684203750/crusader/variants/54000099-PT4001/Jonathan-Right-Chaise-Sofa-Creamy-White-Side-1684203748.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1684203750/crusader/variants/54000099-PT4001/Jonathan-Right-Chaise-Sofa-Creamy-White-Back-1684203748.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1681976653/crusader/variants/54000099-PT4001/Jonathan-Extended-Side-Right-Chaise-Sofa-Creamy-White-Square-Det_2-1681976650.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1681976792/crusader/variants/54000099-PT4001/Jonathan-Side-Chaise-Sofa-Creamy-White-Square-Set_1-1681976789.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1681976824/crusader/variants/54000099-PT4001/Jonathan-Extended-Side-Right-Chaise-Sectional-Sofa-Creamy-White-Square-Set_4-1681976821.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1681976605/crusader/variants/54000099-PT4001/Jonathan-Side-Right-Chaise-Sofa-Creamy-White-Det_1-1681976602.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1683276890/crusader/variants/54000099-PT4001/Jonathan-Side-Right-Chaise-Sofa-Creamy-White-Det_2-1683276888.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1681976605/crusader/variants/54000099-PT4001/Jonathan-Side-Right-Chaise-Sofa-Creamy-White-Det_5-1681976602.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1681976606/crusader/variants/54000099-PT4001/Jonathan-Side-Right-Chaise-Sofa-Creamy-White-Det_6-1681976602.jpg"
      }
],
    sales_channels: sales_channels.map(({ id }) => ({ id })),
    options: [
      {
        title: "Material",
        values: [
        "Charcoal Grey",
        "Frost White",
        "Indigo Blue",
        "Light Blush",
        "Nickel Grey",
        "Olive Gold Velvet",
        "Pearl Beige",
        "Performance Brilliant White",
        "Performance Creamy White",
        "Performance Cumin",
        "Performance Dove Grey",
        "Performance Ginger",
        "Performance Ivory",
        "Performance Moss",
        "Performance Smoke Grey",
        "Performance White Quartz Bouclé",
        "Zenith Blue"
        ]
      }
    ],
    variants: [
      {
        title: "Jonathan Right Chaise, Performance Creamy White",
        sku: "54000099-PT4001",
        options: {
          "Material": "Performance Creamy White"
},
        manage_inventory: false,
        prices: [
          {
            amount: 94900,
            currency_code: 'usd',
          },
          {
            amount: 94900,
            currency_code: 'usd',
            region_id,
          },
        ],
      },
      {
        title: "Jonathan Right Chaise, Zenith Blue",
        sku: "54000099-GI4001",
        options: {
          "Material": "Zenith Blue"
},
        manage_inventory: false,
        prices: [
          {
            amount: 89900,
            currency_code: 'usd',
          },
          {
            amount: 89900,
            currency_code: 'usd',
            region_id,
          },
        ],
      },
      {
        title: "Jonathan Right Chaise Customized, (Twill) Charcoal Grey",
        sku: "54000099C-TL4003",
        options: {
          "Material": "Charcoal Grey"
},
        manage_inventory: false,
        prices: [
          {
            amount: 99900,
            currency_code: 'usd',
          },
          {
            amount: 99900,
            currency_code: 'usd',
            region_id,
          },
        ],
      },
      {
        title: "Jonathan Right Chaise Customized, (velluto) Olive Gold",
        sku: "54000099C-VL4014",
        options: {
          "Material": "Olive Gold Velvet"
},
        manage_inventory: false,
        prices: [
          {
            amount: 96900,
            currency_code: 'usd',
          },
          {
            amount: 96900,
            currency_code: 'usd',
            region_id,
          },
        ],
      },
      {
        title: "Jonathan Right Chaise Customized, (Twill) Indigo Blue",
        sku: "54000099C-TL4001",
        options: {
          "Material": "Indigo Blue"
},
        manage_inventory: false,
        prices: [
          {
            amount: 99900,
            currency_code: 'usd',
          },
          {
            amount: 99900,
            currency_code: 'usd',
            region_id,
          },
        ],
      },
      {
        title: "Jonathan Right Chaise Customized, (Cheyenne) Light Blush",
        sku: "54000099C-CY4003",
        options: {
          "Material": "Light Blush"
},
        manage_inventory: false,
        prices: [
          {
            amount: 99900,
            currency_code: 'usd',
          },
          {
            amount: 99900,
            currency_code: 'usd',
            region_id,
          },
        ],
      },
      {
        title: "Jonathan Right Chaise Customized, (Cheyenne) Frost White",
        sku: "54000099C-CY4001",
        options: {
          "Material": "Frost White"
},
        manage_inventory: false,
        prices: [
          {
            amount: 99900,
            currency_code: 'usd',
          },
          {
            amount: 99900,
            currency_code: 'usd',
            region_id,
          },
        ],
      },
      {
        title: "Jonathan Right Chaise Customized, (Twill) Pearl Beige",
        sku: "54000099C-TL4002",
        options: {
          "Material": "Pearl Beige"
},
        manage_inventory: false,
        prices: [
          {
            amount: 99900,
            currency_code: 'usd',
          },
          {
            amount: 99900,
            currency_code: 'usd',
            region_id,
          },
        ],
      },
      {
        title: "Jonathan Right Chaise Customized, (Performance Marcel) Brilliant White",
        sku: "54000099C-PM4002",
        options: {
          "Material": "Performance Brilliant White"
},
        manage_inventory: false,
        prices: [
          {
            amount: 99900,
            currency_code: 'usd',
          },
          {
            amount: 99900,
            currency_code: 'usd',
            region_id,
          },
        ],
      },
      {
        title: "Jonathan Right Chaise Customized, (Cheyenne) Nickel Grey",
        sku: "54000099C-CY4002",
        options: {
          "Material": "Nickel Grey"
},
        manage_inventory: false,
        prices: [
          {
            amount: 99900,
            currency_code: 'usd',
          },
          {
            amount: 99900,
            currency_code: 'usd',
            region_id,
          },
        ],
      },
      {
        title: "Jonathan Right Chaise Customized, (Performance Peyton) Ivory",
        sku: "54000099C-PY4001",
        options: {
          "Material": "Performance Ivory"
},
        manage_inventory: false,
        prices: [
          {
            amount: 99900,
            currency_code: 'usd',
          },
          {
            amount: 99900,
            currency_code: 'usd',
            region_id,
          },
        ],
      },
      {
        title: "Jonathan Right Chaise Customized, (Performance Peyton) Dove Grey",
        sku: "54000099C-PY4002",
        options: {
          "Material": "Performance Dove Grey"
},
        manage_inventory: false,
        prices: [
          {
            amount: 99900,
            currency_code: 'usd',
          },
          {
            amount: 99900,
            currency_code: 'usd',
            region_id,
          },
        ],
      },
      {
        title: "Jonathan Right Chaise Customized, (Performance Marcel) Smoke Grey",
        sku: "54000099C-PM4001",
        options: {
          "Material": "Performance Smoke Grey"
},
        manage_inventory: false,
        prices: [
          {
            amount: 99900,
            currency_code: 'usd',
          },
          {
            amount: 99900,
            currency_code: 'usd',
            region_id,
          },
        ],
      },
      {
        title: "Jonathan Right Chaise Customized, (Performance Peyton) Moss",
        sku: "54000099C-PY4003",
        options: {
          "Material": "Performance Moss"
},
        manage_inventory: false,
        prices: [
          {
            amount: 99900,
            currency_code: 'usd',
          },
          {
            amount: 99900,
            currency_code: 'usd',
            region_id,
          },
        ],
      },
      {
        title: "Jonathan Right Chaise Customized, (Performance Peyton) Cumin",
        sku: "54000099C-PY4004",
        options: {
          "Material": "Performance Cumin"
},
        manage_inventory: false,
        prices: [
          {
            amount: 99900,
            currency_code: 'usd',
          },
          {
            amount: 99900,
            currency_code: 'usd',
            region_id,
          },
        ],
      },
      {
        title: "Jonathan Right Chaise Customized, (Performance Infinity) Ginger",
        sku: "54000099C-IN4003",
        options: {
          "Material": "Performance Ginger"
},
        manage_inventory: false,
        prices: [
          {
            amount: 102900,
            currency_code: 'usd',
          },
          {
            amount: 102900,
            currency_code: 'usd',
            region_id,
          },
        ],
      },
      {
        title: "Jonathan Right Chaise Customized, (Performance Infinity) White Quartz",
        sku: "54000099C-IN4002",
        options: {
          "Material": "Performance White Quartz Bouclé"
},
        manage_inventory: false,
        prices: [
          {
            amount: 102900,
            currency_code: 'usd',
          },
          {
            amount: 102900,
            currency_code: 'usd',
            region_id,
          },
        ],
      }
    ],
  },
  {
    title: "Auburn Performance Fabric Curve Wedge Sofa",
    description: "With tightback armrests and a gently-curved silhouette, Auburn is a modular piece that delivers a luxurious lounge experience.",
    handle: "auburn-performance-boucle-curve-wedge-sofa",
    status: ProductStatus.PUBLISHED,
    thumbnail: "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1683792587/crusader/variants/50440812-CB4001/Auburn-Performance-Boucle-Curve-Armless-Sofa-Chalk-Front-1683792584.png",
    shipping_profile_id,
    category_ids: [categories.find(c => c.name === "Modular Armless Sofas")?.id, categories.find(c => c.name === "Sofa & Armchairs")?.id].filter(Boolean),
    tag_ids: [tags.find(t => t.value === "bestsellers")?.id, tags.find(t => t.value === "storewide_sale")?.id, tags.find(t => t.value === "all furniture excluding accessories\t")?.id, tags.find(t => t.value === "storewide exclude beige covers")?.id, tags.find(t => t.value === "gss event storewide sale excluding gwp")?.id, tags.find(t => t.value === "all product excluding customisation")?.id, tags.find(t => t.value === "match & save")?.id, tags.find(t => t.value === "all products")?.id, tags.find(t => t.value === "modular_sofas")?.id, tags.find(t => t.value === "style_postmodern")?.id, tags.find(t => t.value === "s3_event (do not use)")?.id, tags.find(t => t.value === "minimalist_furniture")?.id, tags.find(t => t.value === "curve_angled_sofa")?.id, tags.find(t => t.value === "all_sofa")?.id].filter(Boolean),
    collection_id: collections.find(c => c.title === "Auburn Collection")?.id,
    images: [
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1683792587/crusader/variants/50440812-CB4001/Auburn-Performance-Boucle-Curve-Armless-Sofa-Chalk-Front-1683792584.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1683792587/crusader/variants/50440812-CB4001/Auburn-Performance-Boucle-Curve-Armless-Sofa-Chalk-Angle-1683792584.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1683792587/crusader/variants/50440812-CB4001/Auburn-Performance-Boucle-Curve-Armless-Sofa-Chalk-Side-1683792585.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1683792587/crusader/variants/50440812-CB4001/Auburn-Performance-Boucle-Curve-Armless-Sofa-Chalk-Back-1683792585.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1683793661/crusader/variants/50440812-CB4001/Auburn-Performance-Boucle-Armless-Curve-3-Seater-Sofa-Chalk-Square-Set_2-1683793659.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1683793662/crusader/variants/50440812-CB4001/Auburn-Performance-Boucle-Curve-3-Seater-Sofa-Chalk-Square-Set_5-1683793659.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1683793661/crusader/variants/50440812-CB4001/Auburn-Performance-Boucle-Curve-3-Seater-Sofa-Chalk-Square-Det_2-1683793659.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1683792607/crusader/variants/50440812-CB4001/Auburn-Performance-Boucle-Sofa-Chalk-Det_3-1683792604.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1683792607/crusader/variants/50440812-CB4001/Auburn-Performance-Boucle-Sofa-Chalk-Det_4-1683792604.jpg"
      }
],
    sales_channels: sales_channels.map(({ id }) => ({ id })),
    options: [
      {
        title: "Material",
        values: [
        "Chalk Bouclé",
        "Performance Basalt"
        ]
      }
    ],
    variants: [
      {
        title: "Auburn Performance Bouclé Curve Wedge Sofa, Chalk",
        sku: "50440812-CB4001",
        options: {
          "Material": "Chalk Bouclé"
},
        manage_inventory: false,
        prices: [
          {
            amount: 89900,
            currency_code: 'usd',
          },
          {
            amount: 89900,
            currency_code: 'usd',
            region_id,
          },
        ],
      },
      {
        title: "Auburn Curve Wedge Sofa, Performance Basalt",
        sku: "50440812-AR4002",
        options: {
          "Material": "Performance Basalt"
},
        manage_inventory: false,
        prices: [
          {
            amount: 89900,
            currency_code: 'usd',
          },
          {
            amount: 89900,
            currency_code: 'usd',
            region_id,
          },
        ],
      }
    ],
  },
  {
    title: "Auburn Performance Fabric L-Shape Sectional Sofa",
    description: "With tightback armrests and a gently-curved silhouette, Auburn is a modular piece that delivers a luxurious lounge experience.",
    handle: "auburn-performance-boucle-l-shape-sectional-sofa",
    status: ProductStatus.PUBLISHED,
    thumbnail: "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1683795327/crusader/variants/50441135-CB4001/Auburn-Performance-Boucle-Extended-L-Shape-Sectional-Sofa-Chalk-Front-1683795325.png",
    shipping_profile_id,
    category_ids: [categories.find(c => c.name === "L-Shape Sectional Sofas")?.id, categories.find(c => c.name === "Sofa & Armchairs")?.id].filter(Boolean),
    tag_ids: [tags.find(t => t.value === "bestsellers")?.id, tags.find(t => t.value === "storewide_sale")?.id, tags.find(t => t.value === "all furniture excluding accessories\t")?.id, tags.find(t => t.value === "storewide exclude beige covers")?.id, tags.find(t => t.value === "gss event storewide sale excluding gwp")?.id, tags.find(t => t.value === "all product excluding customisation")?.id, tags.find(t => t.value === "match & save")?.id, tags.find(t => t.value === "all products")?.id, tags.find(t => t.value === "modular_sofas")?.id, tags.find(t => t.value === "style_postmodern")?.id, tags.find(t => t.value === "s3_event (do not use)")?.id, tags.find(t => t.value === "modern_luxe")?.id, tags.find(t => t.value === "minimalist_furniture")?.id, tags.find(t => t.value === "performance_boucle_sofas")?.id, tags.find(t => t.value === "all_sofa")?.id].filter(Boolean),
    collection_id: collections.find(c => c.title === "Auburn Collection")?.id,
    images: [
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1683795327/crusader/variants/50441135-CB4001/Auburn-Performance-Boucle-Extended-L-Shape-Sectional-Sofa-Chalk-Front-1683795325.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1683795327/crusader/variants/50441135-CB4001/Auburn-Performance-Boucle-Extended-L-Shape-Sectional-Sofa-Chalk-Side-1683795325.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1683795327/crusader/variants/50441135-CB4001/Auburn-Performance-Boucle-Extended-L-Shape-Sectional-Sofa-Chalk-Back-1683795325.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1683796668/crusader/variants/50441135-CB4001/Auburn-Performance-Boucle-Extended-L-Shape-Sectional-Sofa-Chalk-Square-Set_5-1683796666.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1683796668/crusader/variants/50441135-CB4001/Auburn-Performance-Boucle-Extended-L-Shape-Sectional-Sofa-Chalk-Square-Set_4-1683796666.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1684309216/crusader/variants/T50441135-CB4001/Auburn-Performance-Boucle-Curve-3-Seater-Sofa-Chalk-Square-Det_2-1684309213.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1683795373/crusader/variants/50441135-CB4001/Auburn-Performance-Boucle-Extended-3-Seater-Sofa-Chalk_-Det_1-1683795370.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1683795371/crusader/variants/50441135-CB4001/Auburn-Performance-Boucle-Sofa-Chalk-Det_3-1683795368.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1683795373/crusader/variants/50441135-CB4001/Auburn-Performance-Boucle-Sofa-Chalk-Det_4-1683795371.jpg"
      }
],
    sales_channels: sales_channels.map(({ id }) => ({ id })),
    options: [
      {
        title: "Material",
        values: [
        "Chalk Bouclé",
        "Performance Basalt"
        ]
      }
    ],
    variants: [
      {
        title: "Auburn Performance Bouclé L-Shape Sectional Sofa, Chalk",
        sku: "AS-000309-CB4001",
        options: {
          "Material": "Chalk Bouclé"
},
        manage_inventory: false,
        prices: [
          {
            amount: 408500,
            currency_code: 'usd',
          },
          {
            amount: 408500,
            currency_code: 'usd',
            region_id,
          },
        ],
      },
      {
        title: "Auburn L-Shape Sectional Sofa, Performance Basalt",
        sku: "AS-000309-AR4002",
        options: {
          "Material": "Performance Basalt"
},
        manage_inventory: false,
        prices: [
          {
            amount: 408500,
            currency_code: 'usd',
          },
          {
            amount: 408500,
            currency_code: 'usd',
            region_id,
          },
        ],
      }
    ],
  },
  {
    title: "Emmerson Adjustable Standing Desk",
    description: "Boost your productivity and activity levels even when you're deskbound, with the Emmerson standing desk. This ergonomic desk is height-adjustable and has a handy memory function.",
    handle: "emmerson-adjustable-standing-desk",
    status: ProductStatus.PUBLISHED,
    thumbnail: "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1677489516/crusader/variants/T50441118/Emmerson-Adjustable-Standing-Desk-Angle-120cm_1-1677489514.png",
    shipping_profile_id,
    category_ids: [categories.find(c => c.name === "Tables")?.id, categories.find(c => c.name === "Desks")?.id].filter(Boolean),
    tag_ids: [tags.find(t => t.value === "bestsellers")?.id, tags.find(t => t.value === "storewide_sale")?.id, tags.find(t => t.value === "all furniture excluding accessories\t")?.id, tags.find(t => t.value === "storewide exclude beige covers")?.id, tags.find(t => t.value === "gss event storewide sale excluding gwp")?.id, tags.find(t => t.value === "all product excluding customisation")?.id, tags.find(t => t.value === "match & save")?.id, tags.find(t => t.value === "all products")?.id, tags.find(t => t.value === "style_midcenturymodern")?.id, tags.find(t => t.value === "new_arrivals")?.id, tags.find(t => t.value === "s1_2023_skus")?.id].filter(Boolean),
    
    images: [
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1677489516/crusader/variants/T50441118/Emmerson-Adjustable-Standing-Desk-Angle-120cm_1-1677489514.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1677489611/crusader/variants/T50441118/Emmerson-Adjustable-Standing-Desk-Det_1-1677489605.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1677489516/crusader/variants/T50441118/Emmerson-Adjustable-Standing-Desk-Front-120cm_1-1677489514.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1677489516/crusader/variants/T50441118/Emmerson-Adjustable-Standing-Desk-Side-120cm_2-1677489514.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1677489516/crusader/variants/T50441118/Emmerson-Adjustable-Standing-Desk-Back-120cm_1-1677489514.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1678353385/crusader/variants/T50441118/Emmerson-Adjustable-Standing-Desk-Walnut-3-Stage-Leg-Square-Set_4-1678353382.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1678353470/crusader/variants/T50441119/Emmerson-Adjustable-Standing-Desk-Walnut-3-Stage-Leg-Square-Set_1-1678353468.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1678353791/crusader/variants/T50441119/Emmerson-Adjustable-Standing-Desk-Walnut-3-Stage-Leg-Square-Det_2-1678353789.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1679372098/crusader/variants/T50441119/Emmerson-Adjustable-Standing-Desk-Copy-1679372093.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1679384250/crusader/variants/T50441119/Emmerson-Adjustable-Standing-Desk-Square-Det_2-1679384248.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1677489656/crusader/variants/T50441118/Emmerson-Adjustable-Standing-Desk-Square-Det_4-1677489653.jpg"
      }
],
    sales_channels: sales_channels.map(({ id }) => ({ id })),
    options: [
      {
        title: "Wood",
        values: [
        "American Oak",
        "Chinese Walnut"
        ]
      },
      {
        title: "Length",
        values: [
        "120cm",
        "140cm"
        ]
      }
    ],
    variants: [
      {
        title: "Emmerson Adjustable Standing Desk 120cm with 3-stage Leg, Walnut",
        sku: "AS-000312-WA",
        options: {
          "Wood": "Chinese Walnut",
          "Length": "120cm"
},
        manage_inventory: false,
        prices: [
          {
            amount: 89900,
            currency_code: 'usd',
          },
          {
            amount: 89900,
            currency_code: 'usd',
            region_id,
          },
        ],
      },
      {
        title: "Emmerson Adjustable Standing Desk 120cm American Oak",
        sku: "AS-000998-OA",
        options: {
          "Wood": "American Oak",
          "Length": "120cm"
},
        manage_inventory: false,
        prices: [
          {
            amount: 87900,
            currency_code: 'usd',
          },
          {
            amount: 87900,
            currency_code: 'usd',
            region_id,
          },
        ],
      },
      {
        title: "Emmerson Adjustable Standing Desk 140cm American Oak",
        sku: "AS-000997-OA",
        options: {
          "Wood": "American Oak",
          "Length": "140cm"
},
        manage_inventory: false,
        prices: [
          {
            amount: 92900,
            currency_code: 'usd',
          },
          {
            amount: 92900,
            currency_code: 'usd',
            region_id,
          },
        ],
      }
    ],
  },
  {
    title: "Tilly Cushion",
    description: "Multi-tone yarns give Tilly its rich, textured look. But the real luxury is its finish: a plush velvety feel that adds instant depth to your space.",
    handle: "tilly-cushion",
    status: ProductStatus.PUBLISHED,
    thumbnail: "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1762965327/crusader/variants/50441113-F00901/Tilly-Throw-Cushion-30x50cm-Ash-Front-1762965324.png",
    shipping_profile_id,
    category_ids: [categories.find(c => c.name === "Accessories")?.id, categories.find(c => c.name === "Cushions")?.id].filter(Boolean),
    tag_ids: [tags.find(t => t.value === "c&c_accessories")?.id, tags.find(t => t.value === "new")?.id].filter(Boolean),
    
    images: [
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1762965327/crusader/variants/50441113-F00901/Tilly-Throw-Cushion-30x50cm-Ash-Front-1762965324.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1762965327/crusader/variants/50441113-F00901/Tilly-Throw-Cushion-30x50cm-Ash-Back-1762965324.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1762965327/crusader/variants/50441113-F00901/Tilly-Cushion-50x50cm-Collection-Square-Set_1_-1762965325.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1762965327/crusader/variants/50441113-F00901/Tilly-Throw-Cushion-50x50cm-Ash-Det_3-1762965325.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1762965327/crusader/variants/50441113-F00901/Tilly-Throw-Cushion-50x50cm-Ash-Det_1-1762965325.jpg"
      }
],
    sales_channels: sales_channels.map(({ id }) => ({ id })),
    options: [
      {
        title: "Size",
        values: [
        "30 x 50cm",
        "50 x 50cm"
        ]
      },
      {
        title: "Colour",
        values: [
        "Ash",
        "Ecru",
        "Oyster"
        ]
      }
    ],
    variants: [
      {
        title: "Tilly Cushion, 30 x 50 cm, Ash",
        sku: "50441113-F00901",
        options: {
          "Size": "30 x 50cm",
          "Colour": "Ash"
},
        manage_inventory: false,
        prices: [
          {
            amount: 4900,
            currency_code: 'usd',
          },
          {
            amount: 4900,
            currency_code: 'usd',
            region_id,
          },
        ],
      },
      {
        title: "Tilly Cushion, 30 x 50 cm, Ecru",
        sku: "50441113-F00902",
        options: {
          "Size": "30 x 50cm",
          "Colour": "Ecru"
},
        manage_inventory: false,
        prices: [
          {
            amount: 4900,
            currency_code: 'usd',
          },
          {
            amount: 4900,
            currency_code: 'usd',
            region_id,
          },
        ],
      },
      {
        title: "Tilly Cushion, 50 x 50 cm, Ash",
        sku: "50441112-F00901",
        options: {
          "Size": "50 x 50cm",
          "Colour": "Ash"
},
        manage_inventory: false,
        prices: [
          {
            amount: 5900,
            currency_code: 'usd',
          },
          {
            amount: 5900,
            currency_code: 'usd',
            region_id,
          },
        ],
      },
      {
        title: "Tilly Cushion, 50 x 50 cm, Ecru",
        sku: "50441112-F00902",
        options: {
          "Size": "50 x 50cm",
          "Colour": "Ecru"
},
        manage_inventory: false,
        prices: [
          {
            amount: 5900,
            currency_code: 'usd',
          },
          {
            amount: 5900,
            currency_code: 'usd',
            region_id,
          },
        ],
      },
      {
        title: "Tilly Cushion, 50 x 50 cm, Oyster",
        sku: "50441112-F00903",
        options: {
          "Size": "50 x 50cm",
          "Colour": "Oyster"
},
        manage_inventory: false,
        prices: [
          {
            amount: 5900,
            currency_code: 'usd',
          },
          {
            amount: 5900,
            currency_code: 'usd',
            region_id,
          },
        ],
      }
    ],
  },
  {
    title: "Dillon Extendable Dining Table, 190 - 280cm",
    description: "Dillon extends to fit up to 10 people. It is uniquely designed with tapered legs that draw from the edges of the tabletop.",
    handle: "dillon-extendable-dining-table-190-280cm",
    status: ProductStatus.PUBLISHED,
    thumbnail: "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1673937390/crusader/variants/50220003/Dillon-Extendable-Dining-Table-190cm-Front_1-1673937388.png",
    shipping_profile_id,
    category_ids: [categories.find(c => c.name === "Extendable Dining Tables")?.id, categories.find(c => c.name === "Tables")?.id].filter(Boolean),
    tag_ids: [tags.find(t => t.value === "clearance")?.id, tags.find(t => t.value === "sale")?.id, tags.find(t => t.value === "bestsellers")?.id, tags.find(t => t.value === "storewide_sale")?.id, tags.find(t => t.value === "all furniture excluding accessories\t")?.id, tags.find(t => t.value === "storewide exclude beige covers")?.id, tags.find(t => t.value === "gss event storewide sale excluding gwp")?.id, tags.find(t => t.value === "all product excluding customisation")?.id, tags.find(t => t.value === "match & save")?.id, tags.find(t => t.value === "all_indoor_dining_table")?.id, tags.find(t => t.value === "highlight")?.id, tags.find(t => t.value === "all products")?.id, tags.find(t => t.value === "extendable_dining_tables")?.id, tags.find(t => t.value === "style_modernfarmhouse")?.id, tags.find(t => t.value === "minimalist_furniture")?.id, tags.find(t => t.value === "japandi_furniture")?.id, tags.find(t => t.value === "all_dining_table")?.id, tags.find(t => t.value === "new_arrivals")?.id, tags.find(t => t.value === "s1_2023_skus")?.id].filter(Boolean),
    
    images: [
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1673937390/crusader/variants/50220003/Dillon-Extendable-Dining-Table-190cm-Front_1-1673937388.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1673937390/crusader/variants/50220003/Dillon-Extendable-Dining-Table-190cm-Angle_2-1673937388.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1673937390/crusader/variants/50220003/Dillon-Extendable-Dining-Table-190cm-Side-1673937388.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1673937635/crusader/variants/50220003/Dillon-Extendable-Dining-Table-190cm-Front-1673937633.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1673937390/crusader/variants/50220003/Dillon-Extendable-Dining-Table-190cm-Angle-1673937388.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1676537490/crusader/variants/50220003/Dillon-Extendable-Dining-Table-280cm-Set_2-1676537487.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1676537676/crusader/variants/50220003/Dillon-Extendable-Dining-Table-280cm-Set_1-1676537673.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1700453966/crusader/variants/50220003/Austen-Dining-Arm-Chair-White-Wash-Square-Set_3-1700453963.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1673937416/crusader/variants/50220003/Dillon-Extendable-Dining-Table-190cm-Det_1-1673937414.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1673937416/crusader/variants/50220003/Dillon-Extendable-Dining-Table-190cm-Det_2-1673937414.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1673937416/crusader/variants/50220003/Dillon-Extendable-Dining-Table-190cm-Det_3-1673937414.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1673937417/crusader/variants/50220003/Dillon-Extendable-Dining-Table-190cm-Det_4-1673937414.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1676537856/crusader/variants/50220003/Dillon-Wood-Disclamer-1676537853.jpg"
      }
],
    sales_channels: sales_channels.map(({ id }) => ({ id })),
    options: [
      {
        title: "Default",
        values: [
        "Default"
        ]
      }
    ],
    variants: [
      {
        title: "Dillon Extendable Dining Table, 190 - 280cm",
        sku: "50220003",
        options: {
          "Default": "Default"
},
        manage_inventory: false,
        prices: [
          {
            amount: 83900,
            currency_code: 'usd',
          },
          {
            amount: 83900,
            currency_code: 'usd',
            region_id,
          },
        ],
      }
    ],
  },
  {
    title: "Sawyer Rectangular Coffee Table",
    description: "Sculptural with sturdy legs, the Sawyer Coffee Table brings a modern twist to your space with its oak and black colour combination.",
    handle: "sawyer-rectangular-coffee-table-120cm",
    status: ProductStatus.PUBLISHED,
    thumbnail: "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692436666/crusader/variants/50220010/Sawyer-Rectangular-Coffee-Table-120cm_-Angle-1692436664.png",
    shipping_profile_id,
    category_ids: [categories.find(c => c.name === "Coffee Tables")?.id, categories.find(c => c.name === "Tables")?.id].filter(Boolean),
    tag_ids: [tags.find(t => t.value === "bestsellers")?.id, tags.find(t => t.value === "storewide_sale")?.id, tags.find(t => t.value === "all furniture excluding accessories\t")?.id, tags.find(t => t.value === "storewide exclude beige covers")?.id, tags.find(t => t.value === "gss event storewide sale excluding gwp")?.id, tags.find(t => t.value === "all product excluding customisation")?.id, tags.find(t => t.value === "match & save")?.id, tags.find(t => t.value === "all_coffee_table")?.id, tags.find(t => t.value === "all products")?.id, tags.find(t => t.value === "s3_event_tag")?.id, tags.find(t => t.value === "style_modernfarmhouse")?.id, tags.find(t => t.value === "sofa_bundle_complementary_products")?.id].filter(Boolean),
    collection_id: collections.find(c => c.title === "Sawyer Collection")?.id,
    images: [
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692436666/crusader/variants/50220010/Sawyer-Rectangular-Coffee-Table-120cm_-Angle-1692436664.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692436666/crusader/variants/50220010/Sawyer-Rectangular-Coffee-Table-120cm_-Front-1692436664.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692436665/crusader/variants/50220010/Sawyer-Rectangular-Coffee-Table-120cm_-Side-1692436663.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692437049/crusader/variants/50220010/Sawyer-Rectangular-Coffee-Table-Square-Set_1-1692437047.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1700536994/crusader/variants/50220010/Auburn-Performance-Boucle-Extended-3-Seater-Sofa-Basalt-Square-Set_5-1700536991.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1700536994/crusader/variants/50220010/Auburn-Performance-Boucle-Curve-L-Shape-Sectional-Sofa-Basalt-With-2-Rectangular-Storage-Console-Black-Square-Set_4-1700536991.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692436990/crusader/variants/50220010/Sawyer-Rectangular-Coffee-Table-120cm_-Det_3-1692436988.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692437020/crusader/variants/50220010/Sawyer-Rectangular-Coffee-Table-120cm_-Det_4-1692437018.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692435335/crusader/variants/50220010/Sawyer-Wood-Disclamer-1692435333.jpg"
      }
],
    sales_channels: sales_channels.map(({ id }) => ({ id })),
    options: [
      {
        title: "Length",
        values: [
        "120cm"
        ]
      }
    ],
    variants: [
      {
        title: "Sawyer Rectangular Coffee Table, 120cm",
        sku: "50220010",
        options: {
          "Length": "120cm"
},
        manage_inventory: false,
        prices: [
          {
            amount: 59900,
            currency_code: 'usd',
          },
          {
            amount: 59900,
            currency_code: 'usd',
            region_id,
          },
        ],
      }
    ],
  },
  {
    title: "Jonathan Leather Left Chaise Sofa",
    description: "Swathed in luxurious leather, Jonathan's modern sensibility shines through while keeping to its clean silhouette and lounge-worthy modular seating.",
    handle: "jonathan-leather-left-chaise-sofa",
    status: ProductStatus.PUBLISHED,
    thumbnail: "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692352560/crusader/variants/54000098-LE4016/Jonathan-Leather-Side-Left-Chaise_-Caramel-Front-1692352558.png",
    shipping_profile_id,
    category_ids: [categories.find(c => c.name === "Modular Chaises")?.id, categories.find(c => c.name === "Sofa & Armchairs")?.id].filter(Boolean),
    tag_ids: [tags.find(t => t.value === "bestsellers")?.id, tags.find(t => t.value === "storewide_sale")?.id, tags.find(t => t.value === "all furniture excluding accessories\t")?.id, tags.find(t => t.value === "storewide exclude beige covers")?.id, tags.find(t => t.value === "gss event storewide sale excluding gwp")?.id, tags.find(t => t.value === "all product excluding customisation")?.id, tags.find(t => t.value === "match & save")?.id, tags.find(t => t.value === "all products")?.id, tags.find(t => t.value === "modular_sofas")?.id, tags.find(t => t.value === "s3_event_tag")?.id, tags.find(t => t.value === "style_moderncontemporary")?.id].filter(Boolean),
    collection_id: collections.find(c => c.title === "Jonathan Collection")?.id,
    images: [
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692352560/crusader/variants/54000098-LE4016/Jonathan-Leather-Side-Left-Chaise_-Caramel-Front-1692352558.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692352561/crusader/variants/54000098-LE4016/Jonathan-Leather-Side-Left-Chaise_-Caramel-Angle-1692352558.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692352561/crusader/variants/54000098-LE4016/Jonathan-Leather-Side-Left-Chaise_-Caramel-Side-1692352558.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692352561/crusader/variants/54000098-LE4016/Jonathan-Leather-Side-Left-Chaise_-Caramel-Back-1692352558.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691552382/crusader/variants/54000098-LE4016/Jonathan-Leather-Left-Chaise-Sofa-Square-Set_2-1691552380.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691552383/crusader/variants/54000098-LE4016/Jonathan-Leather-Side-Left-Chaise-Sofa-Square-Set_2-1691552380.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691552382/crusader/variants/54000098-LE4016/Jonathan-Leather-Extended-Side-Left-Chaise-Sectional-Caramel-Square-Set_5-1691552380.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691552431/crusader/variants/54000098-LE4016/Jonathan-Sofa-Leather-Caramel-Det_7-1691552428.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691552431/crusader/variants/54000098-LE4016/Jonathan-Sofa-Leather-Caramel-Det_2-1691552429.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691552255/crusader/variants/54000098-LE4016/Jonathan-Texture-1691552252.jpg"
      }
],
    sales_channels: sales_channels.map(({ id }) => ({ id })),
    options: [
      {
        title: "Material",
        values: [
        "Caramel",
        "Warm Taupe"
        ]
      }
    ],
    variants: [
      {
        title: "Jonathan Leather Left Chaise Sofa, Caramel",
        sku: "54000098-LE4016",
        options: {
          "Material": "Caramel"
},
        manage_inventory: false,
        prices: [
          {
            amount: 149900,
            currency_code: 'usd',
          },
          {
            amount: 149900,
            currency_code: 'usd',
            region_id,
          },
        ],
      },
      {
        title: "Jonathan Leather Left Chaise Sofa, Warm Taupe",
        sku: "54000098-LE4017",
        options: {
          "Material": "Warm Taupe"
},
        manage_inventory: false,
        prices: [
          {
            amount: 149900,
            currency_code: 'usd',
          },
          {
            amount: 149900,
            currency_code: 'usd',
            region_id,
          },
        ],
      }
    ],
  },
  {
    title: "Jonathan Leather Right Chaise Sofa",
    description: "Swathed in luxurious leather, Jonathan's modern sensibility shines through while keeping to its clean silhouette and lounge-worthy modular seating.",
    handle: "jonathan-leather-right-chaise-sofa",
    status: ProductStatus.PUBLISHED,
    thumbnail: "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692352622/crusader/variants/54000099-LE4016/Jonathan-Leather-Side-Right-Chaise_-Caramel-Front-1692352619.png",
    shipping_profile_id,
    category_ids: [categories.find(c => c.name === "Modular Chaises")?.id, categories.find(c => c.name === "Sofa & Armchairs")?.id].filter(Boolean),
    tag_ids: [tags.find(t => t.value === "storewide_sale")?.id, tags.find(t => t.value === "all furniture excluding accessories\t")?.id, tags.find(t => t.value === "storewide exclude beige covers")?.id, tags.find(t => t.value === "gss event storewide sale excluding gwp")?.id, tags.find(t => t.value === "all product excluding customisation")?.id, tags.find(t => t.value === "match & save")?.id, tags.find(t => t.value === "all products")?.id, tags.find(t => t.value === "modular_sofas")?.id, tags.find(t => t.value === "s3_event_tag")?.id, tags.find(t => t.value === "style_moderncontemporary")?.id].filter(Boolean),
    collection_id: collections.find(c => c.title === "Jonathan Collection")?.id,
    images: [
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692352622/crusader/variants/54000099-LE4016/Jonathan-Leather-Side-Right-Chaise_-Caramel-Front-1692352619.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691553230/crusader/variants/54000099-LE4016/Jonathan-Leather-Right-Chaise-Sofa-Square-Set_2-1691553227.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691553230/crusader/variants/54000099-LE4016/Jonathan-Leather-Side-Right-Chaise-Sofa-Square-Set_2-1691553227.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691553276/crusader/variants/54000099-LE4016/Jonathan-Leather-Extended-Side-Right-Chaise-Sectional-Caramel-Square-Set_5-1691553273.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691553318/crusader/variants/54000099-LE4016/Jonathan-Sofa-Leather-Caramel-Det_7-1691553315.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691553317/crusader/variants/54000099-LE4016/Jonathan-Sofa-Leather-Caramel-Det_2-1691553315.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691553334/crusader/variants/54000099-LE4016/Jonathan-Texture-1691553331.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692352621/crusader/variants/54000099-LE4016/Jonathan-Leather-Side-Right-Chaise_-Caramel-Angle-1692352619.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692352621/crusader/variants/54000099-LE4016/Jonathan-Leather-Side-Right-Chaise_-Caramel-Side-1692352619.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692352622/crusader/variants/54000099-LE4016/Jonathan-Leather-Side-Right-Chaise_-Caramel-Back-1692352619.png"
      }
],
    sales_channels: sales_channels.map(({ id }) => ({ id })),
    options: [
      {
        title: "Material",
        values: [
        "Caramel",
        "Warm Taupe"
        ]
      }
    ],
    variants: [
      {
        title: "Jonathan Leather Right Chaise Sofa, Caramel",
        sku: "54000099-LE4016",
        options: {
          "Material": "Caramel"
},
        manage_inventory: false,
        prices: [
          {
            amount: 149900,
            currency_code: 'usd',
          },
          {
            amount: 149900,
            currency_code: 'usd',
            region_id,
          },
        ],
      },
      {
        title: "Jonathan Leather Right Chaise Sofa, Warm Taupe",
        sku: "54000099-LE4017",
        options: {
          "Material": "Warm Taupe"
},
        manage_inventory: false,
        prices: [
          {
            amount: 149900,
            currency_code: 'usd',
          },
          {
            amount: 149900,
            currency_code: 'usd',
            region_id,
          },
        ],
      }
    ],
  },
  {
    title: "Casa Sideboard",
    description: "With a rounded chamfer stop that adds subtle visual appeal, Casa delivers sophistication and functional storage to your space.",
    handle: "casa-sideboard",
    status: ProductStatus.PUBLISHED,
    thumbnail: "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1689073156/crusader/variants/40550217/Casa-Sideboard-Front-1689073153.png",
    shipping_profile_id,
    category_ids: [categories.find(c => c.name === "Sideboards")?.id, categories.find(c => c.name === "Storage")?.id].filter(Boolean),
    tag_ids: [tags.find(t => t.value === "bestsellers")?.id, tags.find(t => t.value === "storewide_sale")?.id, tags.find(t => t.value === "all furniture excluding accessories\t")?.id, tags.find(t => t.value === "storewide exclude beige covers")?.id, tags.find(t => t.value === "gss event storewide sale excluding gwp")?.id, tags.find(t => t.value === "all product excluding customisation")?.id, tags.find(t => t.value === "match & save")?.id, tags.find(t => t.value === "all_sideboard")?.id, tags.find(t => t.value === "all products")?.id, tags.find(t => t.value === "acacia_wood")?.id, tags.find(t => t.value === "furniture_with_storage")?.id, tags.find(t => t.value === "s3_event_tag")?.id, tags.find(t => t.value === "style_modernfarmhouse")?.id, tags.find(t => t.value === "sofa_bundle_complementary_products")?.id, tags.find(t => t.value === "sideboard")?.id].filter(Boolean),
    collection_id: collections.find(c => c.title === "Casa Collection")?.id,
    images: [
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1689073156/crusader/variants/40550217/Casa-Sideboard-Front-1689073153.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1689073156/crusader/variants/40550217/Casa-Sideboard-Front_1-1689073153.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1689073156/crusader/variants/40550217/Casa-Sideboard-Angle-1689073153.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1689073155/crusader/variants/40550217/Casa-Sideboard-Side-1689073153.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1689073156/crusader/variants/40550217/Casa-Sideboard-Back-1689073153.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692345583/crusader/variants/40550217/Casa-Sideboard-Square-Set_1-1692345581.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692345906/crusader/variants/40550217/Casa-Sideboard-Square-Set_3-1692345903.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692605325/crusader/variants/40550217/Casa-Sideboard-Square-Det_4-1692605322.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692426202/crusader/variants/40550217/Casa-Sideboard-Square-Det_3-1692426200.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1689153850/crusader/variants/40550217/Casa-Sideboard-Square-Det_6-1689153847.jpg"
      }
],
    sales_channels: sales_channels.map(({ id }) => ({ id })),
    options: [
      {
        title: "Length",
        values: [
        "180cm"
        ]
      }
    ],
    variants: [
      {
        title: "Casa Sideboard, 180cm",
        sku: "40550217",
        options: {
          "Length": "180cm"
},
        manage_inventory: false,
        prices: [
          {
            amount: 129900,
            currency_code: 'usd',
          },
          {
            amount: 129900,
            currency_code: 'usd',
            region_id,
          },
        ],
      }
    ],
  },
  {
    title: "Casa TV Console",
    description: "Minimalist design, clean lines, and smart storage—Casa keeps your space clutter-free so your only focus is the next episode.",
    handle: "casa-tv-console",
    status: ProductStatus.PUBLISHED,
    thumbnail: "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1756455117/crusader/variants/40550345/Casa-TV-Console-150cm-Front-1756455114.png",
    shipping_profile_id,
    category_ids: [categories.find(c => c.name === "TV Consoles")?.id, categories.find(c => c.name === "Storage")?.id].filter(Boolean),
    tag_ids: [tags.find(t => t.value === "s3'25 products")?.id, tags.find(t => t.value === "small_space_furniture")?.id, tags.find(t => t.value === "new")?.id, tags.find(t => t.value === "storewide_sale")?.id].filter(Boolean),
    collection_id: collections.find(c => c.title === "Casa Collection")?.id,
    images: [
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1756455117/crusader/variants/40550345/Casa-TV-Console-150cm-Front-1756455114.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1756455116/crusader/variants/40550345/Casa-TV-Console-150cm-Angle-1756455114.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1756455117/crusader/variants/40550345/Casa-TV-Console-150cm-Side-1756455114.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1756455117/crusader/variants/40550345/Casa-TV-Console-150cm-Back-1756455114.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1756447589/crusader/variants/40550345/Casa-TV-Console-150cm-Square-Set_1-1756447587.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692349090/crusader/variants/40550220/Casa-TV-Console-Square-Set_1-1692349088.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692758876/crusader/variants/40550220/Casa-TV-Console-Square-Set_6-1692758873.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692426704/crusader/variants/40550220/Casa-TV-Console-Square-Det_2-1692426702.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1689156911/crusader/variants/40550220/Casa-TV-Console-Square-Det_5-1689156908.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1689156910/crusader/variants/40550220/Casa-TV-Console-Square-Det_6-1689156908.jpg"
      }
],
    sales_channels: sales_channels.map(({ id }) => ({ id })),
    options: [
      {
        title: "Length",
        values: [
        "150cm",
        "200cm"
        ]
      }
    ],
    variants: [
      {
        title: "Casa TV Console, 150cm",
        sku: "40550345",
        options: {
          "Length": "150cm"
},
        manage_inventory: false,
        prices: [
          {
            amount: 89900,
            currency_code: 'usd',
          },
          {
            amount: 89900,
            currency_code: 'usd',
            region_id,
          },
        ],
      },
      {
        title: "Casa TV Unit, 200cm",
        sku: "40550220",
        options: {
          "Length": "200cm"
},
        manage_inventory: false,
        prices: [
          {
            amount: 119900,
            currency_code: 'usd',
          },
          {
            amount: 119900,
            currency_code: 'usd',
            region_id,
          },
        ],
      }
    ],
  },
  {
    title: "Casa Console Table",
    description: "With a rounded chamfer stop that adds subtle visual appeal, Casa delivers sophistication and functional storage to your space.",
    handle: "casa-console-table-120cm",
    status: ProductStatus.PUBLISHED,
    thumbnail: "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1711532302/crusader/variants/40550223/Casa-Console-Table-Angle-1711532300.png",
    shipping_profile_id,
    category_ids: [categories.find(c => c.name === "Tables")?.id, categories.find(c => c.name === "Console Tables")?.id].filter(Boolean),
    tag_ids: [tags.find(t => t.value === "bestsellers")?.id, tags.find(t => t.value === "storewide_sale")?.id, tags.find(t => t.value === "all furniture excluding accessories\t")?.id, tags.find(t => t.value === "storewide exclude beige covers")?.id, tags.find(t => t.value === "gss event storewide sale excluding gwp")?.id, tags.find(t => t.value === "all product excluding customisation")?.id, tags.find(t => t.value === "match & save")?.id, tags.find(t => t.value === "all products")?.id, tags.find(t => t.value === "acacia_wood")?.id, tags.find(t => t.value === "s3_event_tag")?.id, tags.find(t => t.value === "style_modernfarmhouse")?.id].filter(Boolean),
    collection_id: collections.find(c => c.title === "Casa Collection")?.id,
    images: [
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1711532302/crusader/variants/40550223/Casa-Console-Table-Angle-1711532300.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1711532302/crusader/variants/40550223/Casa-Console-Table-Angle1-1711532299.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1711532302/crusader/variants/40550223/Casa-Console-Table-Front-1711532300.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1711532302/crusader/variants/40550223/Casa-Console-Table-Side-1711532299.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692430819/crusader/variants/40550223/Casa-Console-Table-Square-Set_4-1692430817.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692606096/crusader/variants/40550223/Casa-Console-Table-Square-Set_2-1692606093.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1689232712/crusader/variants/40550223/Casa-Console-Table-Square-Det_2-1689232710.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1689232712/crusader/variants/40550223/Casa-Console-Table-Square-Det_1-1689232710.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692606111/crusader/variants/40550223/Casa-Dining-Table-Square-Det_1-1692606108.jpg"
      }
],
    sales_channels: sales_channels.map(({ id }) => ({ id })),
    options: [
      {
        title: "Length",
        values: [
        "120cm"
        ]
      }
    ],
    variants: [
      {
        title: "Casa Console Table, 120cm",
        sku: "40550223",
        options: {
          "Length": "120cm"
},
        manage_inventory: false,
        prices: [
          {
            amount: 59900,
            currency_code: 'usd',
          },
          {
            amount: 59900,
            currency_code: 'usd',
            region_id,
          },
        ],
      }
    ],
  },
  {
    title: "Crescent 1-Drawer Bedside Table",
    description: "Crescent features drawers that stack beneath an open storage shelf. Curved edges and mappa burl finishing lend a modern touch to your space.",
    handle: "crescent-1-drawer-bedside-table",
    status: ProductStatus.PUBLISHED,
    thumbnail: "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1696932993/crusader/variants/40280045/Crescent-1-Drawer-Nightstand-Front-1696932991.png",
    shipping_profile_id,
    category_ids: [categories.find(c => c.name === "Bedside Tables")?.id, categories.find(c => c.name === "Storage")?.id].filter(Boolean),
    tag_ids: [tags.find(t => t.value === "le.anne")?.id, tags.find(t => t.value === "bestsellers")?.id, tags.find(t => t.value === "storewide_sale")?.id, tags.find(t => t.value === "small_bedroom_furniture")?.id, tags.find(t => t.value === "small_space_furniture")?.id, tags.find(t => t.value === "trade_side_tables")?.id, tags.find(t => t.value === "all furniture excluding accessories\t")?.id, tags.find(t => t.value === "storewide exclude beige covers")?.id, tags.find(t => t.value === "gss event storewide sale excluding gwp")?.id, tags.find(t => t.value === "all product excluding customisation")?.id, tags.find(t => t.value === "curved_furniture")?.id, tags.find(t => t.value === "match & save")?.id, tags.find(t => t.value === "rounded_furniture")?.id, tags.find(t => t.value === "all_bedside_side_table")?.id, tags.find(t => t.value === "all products")?.id].filter(Boolean),
    collection_id: collections.find(c => c.title === "Crescent Collection")?.id,
    images: [
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1696932993/crusader/variants/40280045/Crescent-1-Drawer-Nightstand-Front-1696932991.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1696932993/crusader/variants/40280045/Crescent-1-Drawer-Nightstand-Angle-1696932991.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1696932993/crusader/variants/40280045/Crescent-1-Drawer-Nightstand-Side-1696932991.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1696932993/crusader/variants/40280045/Crescent-1-Drawer-Nightstand-Back-1696932991.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1697772652/crusader/variants/40280045/Crescent-1-Drawer-Nightstand-Square-Set_4-1697772649.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1697772796/crusader/variants/40280045/Crescent-1-Drawer-Nightstand-Square-Set_3-1697772793.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1698633733/crusader/variants/PB-001230/Cresent-Bed-With-2-1-Drawer-Nightstand-Square-Set_1-1698633730.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1697772699/crusader/variants/40280045/Dawson-non-storage-bed-Seagull-Square-Set_2-1697772696.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1697772652/crusader/variants/40280045/Crescent-1-Drawer-Nightstand-Square-Det_1-1697772649.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1697622987/crusader/variants/40280045/Crescent-1-Drawer-Nightstand-With-2-Drawer-Nightstand-1697622984.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1696933397/crusader/variants/40280045/Crescent-2-Drawer-Nightstand-Square-Det_1-1696933394.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1731308875/crusader/variants/40280045/Crescent-6-Drawer-Dresser-Square-Det_10-1731308872.jpg"
      }
],
    sales_channels: sales_channels.map(({ id }) => ({ id })),
    options: [
      {
        title: "Default",
        values: [
        "Default"
        ]
      }
    ],
    variants: [
      {
        title: "Crescent 1-Drawer Bedside Table",
        sku: "40280045",
        options: {
          "Default": "Default"
},
        manage_inventory: false,
        prices: [
          {
            amount: 59900,
            currency_code: 'usd',
          },
          {
            amount: 59900,
            currency_code: 'usd',
            region_id,
          },
        ],
      }
    ],
  },
  {
    title: "Austen Dining Arm Chair, White Wash",
    description: "Serve up mid-century modern charm alongside your daily meals with Austen, an elegant dining chair with a refined silhouette.",
    handle: "austen-dining-arm-chair-white-wash",
    status: ProductStatus.PUBLISHED,
    thumbnail: "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1696935038/crusader/variants/54000149-WW/Austen-Dining-Chair-White-Wash-Angle-1696935036.png",
    shipping_profile_id,
    category_ids: [categories.find(c => c.name === "Chairs & Benches")?.id, categories.find(c => c.name === "Dining Chairs")?.id].filter(Boolean),
    tag_ids: [tags.find(t => t.value === "storewide_sale")?.id, tags.find(t => t.value === "all furniture excluding accessories\t")?.id, tags.find(t => t.value === "storewide exclude beige covers")?.id, tags.find(t => t.value === "gss event storewide sale excluding gwp")?.id, tags.find(t => t.value === "all product excluding customisation")?.id, tags.find(t => t.value === "match & save")?.id, tags.find(t => t.value === "all_indoor_dining_chair")?.id, tags.find(t => t.value === "all products")?.id, tags.find(t => t.value === "style_midcenturymodern")?.id].filter(Boolean),
    collection_id: collections.find(c => c.title === "Austen Collection")?.id,
    images: [
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1696935038/crusader/variants/54000149-WW/Austen-Dining-Chair-White-Wash-Angle-1696935036.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1696935038/crusader/variants/54000149-WW/Austen-Dining-Chair-White-Wash-Front-1696935036.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1696935038/crusader/variants/54000149-WW/Austen-Dining-Chair-White-Wash-Side-1696935036.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1696935038/crusader/variants/54000149-WW/Austen-Dining-Chair-White-Wash-Back-1696935036.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1700453305/crusader/variants/54000149-WW/Austen-Dining-Arm-Chair-White-Wash-Square-Set_4-1700453303.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1700453306/crusader/variants/54000149-WW/Austen-Dining-Arm-Chair-White-Wash-Square-Set_1-1700453303.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1700453306/crusader/variants/54000149-WW/Austen-Dining-Arm-Chair-White-Wash-Square-Set_3-1700453303.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1700453464/crusader/variants/54000149-WW/Austen-Dining-Arm-Chair-White-Wash-Square-Det_3-1700453461.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1700453130/crusader/variants/54000149-WW/Austen-Dining-Arm-Chair-Walnut-With-Arm-Dining-Chair-White-Square-Set_1-1700453127.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1696935102/crusader/variants/54000149-WW/Austen-Dining-Arm-Chair-White-Wash-Square-Det_1-1696935100.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1696935182/crusader/variants/54000149-WW/Austen-Dining-Arm-Chair-White-Wash-Square-Det_4-1696935180.jpg"
      }
],
    sales_channels: sales_channels.map(({ id }) => ({ id })),
    options: [
      {
        title: "Wood",
        values: [
        "White Wash"
        ]
      }
    ],
    variants: [
      {
        title: "Austen Dining Arm Chair, White Wash",
        sku: "54000149-WW",
        options: {
          "Wood": "White Wash"
},
        manage_inventory: false,
        prices: [
          {
            amount: 34900,
            currency_code: 'usd',
          },
          {
            amount: 34900,
            currency_code: 'usd',
            region_id,
          },
        ],
      }
    ],
  },
  {
    title: "Jonathan Leather Extended Side Chaise Sofa",
    description: "Swathed in luxurious leather, Jonathan's modern sensibility shines through while keeping to its clean silhouette and lounge-worthy modular seating.",
    handle: "jonathan-leather-extended-side-chaise-sofa",
    status: ProductStatus.PUBLISHED,
    thumbnail: "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692353534/crusader/variants/AS-000386-LE4016/Jonathan-Leather-Extended-Side-Left-Chaise-Sofa-_Caramel-Front-1692353532.png",
    shipping_profile_id,
    category_ids: [categories.find(c => c.name === "Extended 3 Seater Sofas")?.id, categories.find(c => c.name === "Sofa & Armchairs")?.id].filter(Boolean),
    tag_ids: [tags.find(t => t.value === "storewide_sale")?.id, tags.find(t => t.value === "all furniture excluding accessories\t")?.id, tags.find(t => t.value === "storewide exclude beige covers")?.id, tags.find(t => t.value === "gss event storewide sale excluding gwp")?.id, tags.find(t => t.value === "all product excluding customisation")?.id, tags.find(t => t.value === "match & save")?.id, tags.find(t => t.value === "all products")?.id, tags.find(t => t.value === "modular_sofas")?.id, tags.find(t => t.value === "s3_event_tag")?.id, tags.find(t => t.value === "style_moderncontemporary")?.id, tags.find(t => t.value === "s3_event (do not use)")?.id, tags.find(t => t.value === "all_sofa")?.id].filter(Boolean),
    collection_id: collections.find(c => c.title === "Jonathan Collection")?.id,
    images: [
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692353534/crusader/variants/AS-000386-LE4016/Jonathan-Leather-Extended-Side-Left-Chaise-Sofa-_Caramel-Front-1692353532.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692353535/crusader/variants/AS-000386-LE4016/Jonathan-Leather-Extended-Side-Left-Chaise-Sofa-_Caramel-Angle-1692353532.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692353534/crusader/variants/AS-000386-LE4016/Jonathan-Leather-Extended-Side-Left-Chaise-Sofa-_Caramel-Side-1692353532.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692353535/crusader/variants/AS-000386-LE4016/Jonathan-Leather-Extended-Side-Left-Chaise-Sofa-_Caramel-Back-1692353532.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691568226/crusader/variants/AS-000386-LE4016/Jonathan-Leather-Extended-Side-Left-Chaise-Sofa-With-Ottoman-Caramel-Square-Set_2-1691568224.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691568227/crusader/variants/AS-000386-LE4016/Jonathan-Leather-Extended-Side-Left-Chaise-Sofa-With-Ottoman-Caramel-Square-Set_4-1691568224.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691568227/crusader/variants/AS-000386-LE4016/Jonathan-Leather-Left-Chaise-Sofa-Caramel-Square-Det_1-1691568224.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691568226/crusader/variants/AS-000386-LE4016/Jonathan-Leather-Side-Left-Chaise-Sectional-Caramel-Square-Det_1-1691568224.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691568125/crusader/variants/AS-000386-LE4016/Jonathan-Sofa-Leather-Caramel-Det_7-1691568122.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691568109/crusader/variants/AS-000386-LE4016/Jonathan-Sofa-Leather-Caramel-Det_2__1_-1691568107.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691568095/crusader/variants/AS-000386-LE4016/Jonathan-Texture-1691568093.jpg"
      }
],
    sales_channels: sales_channels.map(({ id }) => ({ id })),
    options: [
      {
        title: "Orientation",
        values: [
        "Left Facing",
        "Right Facing"
        ]
      },
      {
        title: "Material",
        values: [
        "Caramel",
        "Warm Taupe"
        ]
      }
    ],
    variants: [
      {
        title: "Jonathan Leather Extended Side Chaise Sofa Left Facing, Caramel",
        sku: "AS-000386-LE4016",
        options: {
          "Orientation": "Left Facing",
          "Material": "Caramel"
},
        manage_inventory: false,
        prices: [
          {
            amount: 374700,
            currency_code: 'usd',
          },
          {
            amount: 374700,
            currency_code: 'usd',
            region_id,
          },
        ],
      },
      {
        title: "Jonathan Leather Extended Side Chaise Sofa Right Facing, Caramel",
        sku: "AS-000387-LE4016",
        options: {
          "Orientation": "Right Facing",
          "Material": "Caramel"
},
        manage_inventory: false,
        prices: [
          {
            amount: 374700,
            currency_code: 'usd',
          },
          {
            amount: 374700,
            currency_code: 'usd',
            region_id,
          },
        ],
      },
      {
        title: "Jonathan Leather Extended Side Chaise Sofa Left Facing, Warm Taupe",
        sku: "AS-000386-LE4017",
        options: {
          "Orientation": "Left Facing",
          "Material": "Warm Taupe"
},
        manage_inventory: false,
        prices: [
          {
            amount: 374700,
            currency_code: 'usd',
          },
          {
            amount: 374700,
            currency_code: 'usd',
            region_id,
          },
        ],
      },
      {
        title: "Jonathan Leather Extended Side Chaise Sofa Right Facing, Warm Taupe",
        sku: "AS-000387-LE4017",
        options: {
          "Orientation": "Right Facing",
          "Material": "Warm Taupe"
},
        manage_inventory: false,
        prices: [
          {
            amount: 374700,
            currency_code: 'usd',
          },
          {
            amount: 374700,
            currency_code: 'usd',
            region_id,
          },
        ],
      }
    ],
  },
  {
    title: "Hamilton 3 Seater Sofa",
    description: "Made for all-day lounging (snacks included)—with deep seats for stretching out and performance fabric that stands up to spills. Hamilton gets how you actually relax.",
    handle: "hamilton-3-seater-sofa",
    status: ProductStatus.PUBLISHED,
    thumbnail: "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1634798906/crusader/variants/50440764-MC4002/Hamilton-3-Seater-Sofa-Brilliant-White-Front-SG.png",
    shipping_profile_id,
    category_ids: [categories.find(c => c.name === "3 Seater Sofas")?.id, categories.find(c => c.name === "Sofa & Armchairs")?.id].filter(Boolean),
    tag_ids: [tags.find(t => t.value === "sale")?.id, tags.find(t => t.value === "bestsellers")?.id, tags.find(t => t.value === "storewide_sale")?.id, tags.find(t => t.value === "small_living_room_furniture")?.id, tags.find(t => t.value === "small_space_furniture")?.id, tags.find(t => t.value === "all furniture excluding accessories\t")?.id, tags.find(t => t.value === "storewide exclude beige covers")?.id, tags.find(t => t.value === "gss event storewide sale excluding gwp")?.id, tags.find(t => t.value === "all product excluding customisation")?.id, tags.find(t => t.value === "match & save")?.id, tags.find(t => t.value === "all products")?.id, tags.find(t => t.value === "style_moderncontemporary")?.id, tags.find(t => t.value === "s3_event (do not use)")?.id, tags.find(t => t.value === "cosy_furniture")?.id, tags.find(t => t.value === "all_sofa")?.id].filter(Boolean),
    collection_id: collections.find(c => c.title === "Hamilton Collection")?.id,
    images: [
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1634798906/crusader/variants/50440764-MC4002/Hamilton-3-Seater-Sofa-Brilliant-White-Front-SG.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1634798906/crusader/variants/50440764-MC4002/Hamilton-3-Seater-Sofa-Brilliant-White-Angle-SG.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1634798906/crusader/variants/50440764-MC4002/Hamilton-3-Seater-Sofa-Brilliant-White-Side-SG.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1634798907/crusader/variants/50440764-MC4002/Hamilton-3-Seater-Sofa-Brilliant-White-Back-SG.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1635412853/crusader/variants/50440764-MC4002/Hamilton-3-Seater-Sofa-Brilliant-White-Square-Set_4.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1634799049/crusader/variants/50440764-MC4002/Hamilton-3-Seater-Sofa-Brilliant-White-Square-Set_1.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1635412852/crusader/variants/50440764-MC4002/Hamilton-3-Seater-Sofa-Brilliant-White-Square-Set_3.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1717398937/crusader/variants/50440764-MC4001/Owen-Sofa-Headrest-Opal-Beige-Square-Det_10-1717398935.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1672979178/crusader/variants/50440764-MC4002/Hamilton-Sectional-Sofa-Brilliant-White-Square-Det_6-1672979175.jpg"
      }
],
    sales_channels: sales_channels.map(({ id }) => ({ id })),
    options: [
      {
        title: "Frame cover",
        values: [
        "Fixed",
        "Removable"
        ]
      },
      {
        title: "Material",
        values: [
        "Performance Brilliant White",
        "Performance Creamy White",
        "Performance Cumin",
        "Performance Dove Grey",
        "Performance Ginger",
        "Performance Ivory",
        "Performance Moss",
        "Performance Smoke Grey",
        "Performance White Quartz Bouclé"
        ]
      }
    ],
    variants: [
      {
        title: "Hamilton 3 Seater Sofa, Performance Brilliant White",
        sku: "50440764-PM4002",
        options: {
          "Frame cover": "Fixed",
          "Material": "Performance Brilliant White"
},
        manage_inventory: false,
        prices: [
          {
            amount: 143900,
            currency_code: 'usd',
          },
          {
            amount: 143900,
            currency_code: 'usd',
            region_id,
          },
        ],
      },
      {
        title: "Hamilton 3 Seater Sofa, (Performance Marcel) Brilliant White",
        sku: "50441025-PM4002",
        options: {
          "Frame cover": "Removable",
          "Material": "Performance Brilliant White"
},
        manage_inventory: false,
        prices: [
          {
            amount: 159900,
            currency_code: 'usd',
          },
          {
            amount: 159900,
            currency_code: 'usd',
            region_id,
          },
        ],
      },
      {
        title: "Hamilton 3 Seater Sofa, (Performance Marcel) Smoke Grey",
        sku: "50441025-PM4001",
        options: {
          "Frame cover": "Removable",
          "Material": "Performance Smoke Grey"
},
        manage_inventory: false,
        prices: [
          {
            amount: 159900,
            currency_code: 'usd',
          },
          {
            amount: 159900,
            currency_code: 'usd',
            region_id,
          },
        ],
      },
      {
        title: "Hamilton 3 Seater Sofa Customised, (Performance Infinity) White Quartz",
        sku: "50441025C-IN4002",
        options: {
          "Frame cover": "Removable",
          "Material": "Performance White Quartz Bouclé"
},
        manage_inventory: false,
        prices: [
          {
            amount: 183900,
            currency_code: 'usd',
          },
          {
            amount: 183900,
            currency_code: 'usd',
            region_id,
          },
        ],
      },
      {
        title: "Hamilton 3 Seater Sofa Customised, (Performance Twill) Creamy White",
        sku: "50441025C-PT4001",
        options: {
          "Frame cover": "Removable",
          "Material": "Performance Creamy White"
},
        manage_inventory: false,
        prices: [
          {
            amount: 178900,
            currency_code: 'usd',
          },
          {
            amount: 178900,
            currency_code: 'usd',
            region_id,
          },
        ],
      },
      {
        title: "Hamilton 3 Seater Sofa Customised, (Performance Infinity) Ginger",
        sku: "50441025C-IN4003",
        options: {
          "Frame cover": "Removable",
          "Material": "Performance Ginger"
},
        manage_inventory: false,
        prices: [
          {
            amount: 183900,
            currency_code: 'usd',
          },
          {
            amount: 183900,
            currency_code: 'usd',
            region_id,
          },
        ],
      },
      {
        title: "Hamilton 3 Seater Sofa Customised, (Performance Peyton) Ivory",
        sku: "50441025C-PY4001",
        options: {
          "Frame cover": "Removable",
          "Material": "Performance Ivory"
},
        manage_inventory: false,
        prices: [
          {
            amount: 178900,
            currency_code: 'usd',
          },
          {
            amount: 178900,
            currency_code: 'usd',
            region_id,
          },
        ],
      },
      {
        title: "Hamilton 3 Seater Sofa Customised, (Performance Peyton) Dove Grey",
        sku: "50441025C-PY4002",
        options: {
          "Frame cover": "Removable",
          "Material": "Performance Dove Grey"
},
        manage_inventory: false,
        prices: [
          {
            amount: 178900,
            currency_code: 'usd',
          },
          {
            amount: 178900,
            currency_code: 'usd',
            region_id,
          },
        ],
      },
      {
        title: "Hamilton 3 Seater Sofa Customised, (Performance Peyton) Cumin",
        sku: "50441025C-PY4004",
        options: {
          "Frame cover": "Removable",
          "Material": "Performance Cumin"
},
        manage_inventory: false,
        prices: [
          {
            amount: 178900,
            currency_code: 'usd',
          },
          {
            amount: 178900,
            currency_code: 'usd',
            region_id,
          },
        ],
      },
      {
        title: "Hamilton 3 Seater Sofa Customised, (Performance Peyton) Moss",
        sku: "50441025C-PY4003",
        options: {
          "Frame cover": "Removable",
          "Material": "Performance Moss"
},
        manage_inventory: false,
        prices: [
          {
            amount: 178900,
            currency_code: 'usd',
          },
          {
            amount: 178900,
            currency_code: 'usd',
            region_id,
          },
        ],
      }
    ],
  },
  {
    title: "Mori Performance Fabric Right Chaise Sofa",
    description: "With feather-filled seats and a low, laid-back profile, Mori's the kind of seat you sink into and never want to leave.",
    handle: "mori-performance-fabric-right-chaise",
    status: ProductStatus.PUBLISHED,
    thumbnail: "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691395506/crusader/variants/AS-000403-PG4001/Mori-Right-Facing-Chaise-Sofa-Alpine-Front-1691395504.png",
    shipping_profile_id,
    category_ids: [categories.find(c => c.name === "Modular Chaises")?.id, categories.find(c => c.name === "Sofa & Armchairs")?.id].filter(Boolean),
    tag_ids: [tags.find(t => t.value === "s3'25 products")?.id, tags.find(t => t.value === "new")?.id, tags.find(t => t.value === "storewide_sale")?.id].filter(Boolean),
    collection_id: collections.find(c => c.title === "Mori Collection")?.id,
    images: [
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691395506/crusader/variants/AS-000403-PG4001/Mori-Right-Facing-Chaise-Sofa-Alpine-Front-1691395504.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691395506/crusader/variants/AS-000403-PG4001/Mori-Right-Facing-Chaise-Sofa-Alpine-Angle-1691395504.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691395506/crusader/variants/AS-000403-PG4001/Mori-Right-Facing-Chaise-Sofa-Alpine-Side-1691395504.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691395506/crusader/variants/AS-000403-PG4001/Mori-Right-Facing-Chaise-Sofa-Alpine-Back-1691395504.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692004617/crusader/variants/AS-000403-PG4001/Mori-Right-Facing-Chaise-Sectional-Sofa-Square-Set_5-1692004615.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692003381/crusader/variants/AS-000403-PG4001/Mori-Right-Facing-Chaise-Sectional-Sofa-With-Attachable-Ottoman-Square-Set_1-1692003378.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692003381/crusader/variants/AS-000403-PG4001/Mori-Right-Facing-Chaise-Sectional-Sofa-Square-Set_4-1692003378.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1716799505/crusader/variants/AS-000403-PG4001/Sofa-Armrest-Table-Natural-Square-Set_4-1716799505.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692004738/crusader/variants/AS-000403-PG4001/Mori-L-Shape-Sofa-Alpine-Square-Det_2-1692004735.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692004738/crusader/variants/AS-000403-PG4001/Mori-Left-Facing-Chaise-Sectional-Sofa-Alpine-Square-Det_2-1692004735.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692347974/crusader/variants/AS-000403-PG4001/Mori-Ottoman-Alpine-Det_1-1692347969.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691395522/crusader/variants/AS-000403-PG4001/Arden-Swivel-Armchair-Alpine-Square-Det_1-1691395520.jpg"
      }
],
    sales_channels: sales_channels.map(({ id }) => ({ id })),
    options: [
      {
        title: "Frame cover",
        values: [
        "Removable"
        ]
      },
      {
        title: "Colour",
        values: [
        "Natural",
        "Walnut"
        ]
      },
      {
        title: "Material",
        values: [
        "Performance Alpine",
        "Performance Genova, Oat"
        ]
      }
    ],
    variants: [
      {
        title: "Mori Right Chaise, (Performance Genova) Alpine (Natural)",
        sku: "AS-000859-PG4001-NA",
        options: {
          "Frame cover": "Removable",
          "Colour": "Natural",
          "Material": "Performance Alpine"
},
        manage_inventory: false,
        prices: [
          {
            amount: 149900,
            currency_code: 'usd',
          },
          {
            amount: 149900,
            currency_code: 'usd',
            region_id,
          },
        ],
      },
      {
        title: "Mori Right Chaise, (Performance Genova) Alpine (Walnut)",
        sku: "AS-000860-PG4001-WA",
        options: {
          "Frame cover": "Removable",
          "Colour": "Walnut",
          "Material": "Performance Alpine"
},
        manage_inventory: false,
        prices: [
          {
            amount: 149900,
            currency_code: 'usd',
          },
          {
            amount: 149900,
            currency_code: 'usd',
            region_id,
          },
        ],
      },
      {
        title: "Mori Right Chaise, (Performance Genova) Oat (Natural)",
        sku: "AS-000859-PG4002-NA",
        options: {
          "Frame cover": "Removable",
          "Colour": "Natural",
          "Material": "Performance Genova, Oat"
},
        manage_inventory: false,
        prices: [
          {
            amount: 149900,
            currency_code: 'usd',
          },
          {
            amount: 149900,
            currency_code: 'usd',
            region_id,
          },
        ],
      },
      {
        title: "Mori Right Chaise, (Performance Genova) Oat (Walnut)",
        sku: "AS-000860-PG4002-WA",
        options: {
          "Frame cover": "Removable",
          "Colour": "Walnut",
          "Material": "Performance Genova, Oat"
},
        manage_inventory: false,
        prices: [
          {
            amount: 149900,
            currency_code: 'usd',
          },
          {
            amount: 149900,
            currency_code: 'usd',
            region_id,
          },
        ],
      }
    ],
  },
  {
    title: "Mori Performance Fabric Side Ottoman",
    description: "More than a footrest: this is the extra seat—and flexibility—your space needs. Attach it beside a 2-seater, 3-seater, or even on the far side of a side table to make room for extra guests.",
    handle: "mori-performance-fabric-side-ottoman",
    status: ProductStatus.PUBLISHED,
    thumbnail: "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691396300/crusader/variants/AS-000404-PG4001/Mori-Large-Ottoman-Alpine-Side-1691396298.png",
    shipping_profile_id,
    category_ids: [categories.find(c => c.name === "Ottomans")?.id, categories.find(c => c.name === "Sofa & Armchairs")?.id].filter(Boolean),
    tag_ids: [tags.find(t => t.value === "storewide_sale")?.id, tags.find(t => t.value === "all furniture excluding accessories\t")?.id, tags.find(t => t.value === "storewide exclude beige covers")?.id, tags.find(t => t.value === "gss event storewide sale excluding gwp")?.id, tags.find(t => t.value === "all product excluding customisation")?.id, tags.find(t => t.value === "match & save")?.id, tags.find(t => t.value === "all_ottoman")?.id, tags.find(t => t.value === "all products")?.id, tags.find(t => t.value === "modular_sofas")?.id, tags.find(t => t.value === "s3_event_tag")?.id, tags.find(t => t.value === "style_modernfarmhouse")?.id, tags.find(t => t.value === "sofa_bundle_complementary_products")?.id].filter(Boolean),
    collection_id: collections.find(c => c.title === "Mori Collection")?.id,
    images: [
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691396300/crusader/variants/AS-000404-PG4001/Mori-Large-Ottoman-Alpine-Side-1691396298.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692257444/crusader/variants/AS-000404-PG4001/Mori-Attachable-Ottoman-Alpine-Set_1-1692257441.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692246083/crusader/variants/AS-000404-PG4001/Mori-Left-Facing-2-Seater-Sofa-With-Side-Table-And-Attachable-Ottoman-Square-Set_1-1692246080.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692246083/crusader/variants/AS-000404-PG4001/Mori-Left-Facing-Chaise-Sectional-Sofa-With-Attachable-Ottoman-Square-Set_4-1692246080.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692002858/crusader/variants/AS-000404-PG4001/Mori-Armless-L-Shape-Sectional-Sofa-Alpine-Square-Det_2-1692002855.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692347987/crusader/variants/AS-000404-PG4001/Mori-Ottoman-Alpine-Det_1-1692347984.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691395662/crusader/variants/AS-000404-PG4001/Arden-Swivel-Armchair-Alpine-Square-Det_1-1691395660.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691396300/crusader/variants/AS-000404-PG4001/Mori-Large-Ottoman-Alpine-Angle-1691396298.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691396299/crusader/variants/AS-000404-PG4001/Mori-Large-Ottoman-Alpine-Front-1691396297.png"
      }
],
    sales_channels: sales_channels.map(({ id }) => ({ id })),
    options: [
      {
        title: "Frame cover",
        values: [
        "Fixed",
        "Removable"
        ]
      },
      {
        title: "Colour",
        values: [
        "Natural",
        "Walnut"
        ]
      },
      {
        title: "Material",
        values: [
        "Performance Alpine",
        "Performance Genova, Oat"
        ]
      }
    ],
    variants: [
      {
        title: "Mori Side Ottoman, Performance Alpine",
        sku: "AS-000404-PG4001",
        options: {
          "Frame cover": "Fixed",
          "Colour": "Natural",
          "Material": "Performance Alpine"
},
        manage_inventory: false,
        prices: [
          {
            amount: 66900,
            currency_code: 'usd',
          },
          {
            amount: 66900,
            currency_code: 'usd',
            region_id,
          },
        ],
      },
      {
        title: "Mori Side Ottoman, (Performance Genova) Alpine (Natural)",
        sku: "AS-000863-PG4001-NA",
        options: {
          "Frame cover": "Removable",
          "Colour": "Natural",
          "Material": "Performance Alpine"
},
        manage_inventory: false,
        prices: [
          {
            amount: 66900,
            currency_code: 'usd',
          },
          {
            amount: 66900,
            currency_code: 'usd',
            region_id,
          },
        ],
      },
      {
        title: "Mori Side Ottoman, (Performance Genova) Alpine (Walnut)",
        sku: "AS-000864-PG4001-WA",
        options: {
          "Frame cover": "Removable",
          "Colour": "Walnut",
          "Material": "Performance Alpine"
},
        manage_inventory: false,
        prices: [
          {
            amount: 66900,
            currency_code: 'usd',
          },
          {
            amount: 66900,
            currency_code: 'usd',
            region_id,
          },
        ],
      },
      {
        title: "Mori Side Ottoman, (Performance Genova) Oat (Natural)",
        sku: "AS-000863-PG4002-NA",
        options: {
          "Frame cover": "Removable",
          "Colour": "Natural",
          "Material": "Performance Genova, Oat"
},
        manage_inventory: false,
        prices: [
          {
            amount: 66900,
            currency_code: 'usd',
          },
          {
            amount: 66900,
            currency_code: 'usd',
            region_id,
          },
        ],
      },
      {
        title: "Mori Side Ottoman, (Performance Genova) Oat (Walnut)",
        sku: "AS-000864-PG4002-WA",
        options: {
          "Frame cover": "Removable",
          "Colour": "Walnut",
          "Material": "Performance Genova, Oat"
},
        manage_inventory: false,
        prices: [
          {
            amount: 66900,
            currency_code: 'usd',
          },
          {
            amount: 66900,
            currency_code: 'usd',
            region_id,
          },
        ],
      }
    ],
  },
  {
    title: "Vincent Chair, Oak",
    description: "Fronted by graceful curves and a slim silhouette, Vincent's charisma sets the tone for all the little moments at home.",
    handle: "vincent-chair-oak",
    status: ProductStatus.PUBLISHED,
    thumbnail: "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1703744131/crusader/variants/41960031/Vincent-Dining-Chair-Oak-Angle-1703744129.png",
    shipping_profile_id,
    category_ids: [categories.find(c => c.name === "Chairs & Benches")?.id, categories.find(c => c.name === "Dining Chairs")?.id].filter(Boolean),
    tag_ids: [tags.find(t => t.value === "storewide_sale")?.id, tags.find(t => t.value === "all furniture excluding accessories\t")?.id, tags.find(t => t.value === "storewide exclude beige covers")?.id, tags.find(t => t.value === "gss event storewide sale excluding gwp")?.id, tags.find(t => t.value === "all product excluding customisation")?.id, tags.find(t => t.value === "match & save")?.id, tags.find(t => t.value === "all_indoor_dining_chair")?.id, tags.find(t => t.value === "all products")?.id].filter(Boolean),
    collection_id: collections.find(c => c.title === "Vincent Collection")?.id,
    images: [
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1703744131/crusader/variants/41960031/Vincent-Dining-Chair-Oak-Angle-1703744129.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1703744131/crusader/variants/41960031/Vincent-Dining-Chair-Oak-Front-1703744129.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1703744131/crusader/variants/41960031/Vincent-Dining-Chair-Oak-Side-1703744129.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1703744131/crusader/variants/41960031/Vincent-Dining-Chair-Oak-Back-1703744129.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1705906803/crusader/variants/41960031/Vincent-Dining-Chair-Oak-Square-Set_1-1705906801.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1705906804/crusader/variants/41960031/Vincent-Dining-Table-With-6-Dining-Chair-Walnut-Square-Set_1-1705906801.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1705906803/crusader/variants/41960031/Vincent-Dining-Table-With-6-Dining-Chair-Walnut-Square-Set_2-1705906801.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1703744150/crusader/variants/41960031/Vincent-Dining-Chair-Oak-Square-Det_4-1703744147.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1703744150/crusader/variants/41960031/Vincent-Dining-Chair-Oak-Square-Det_3-1703744147.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1703744150/crusader/variants/41960031/Vincent-Dining-Chair-Oak-Square-Det_5-1703744147.jpg"
      }
],
    sales_channels: sales_channels.map(({ id }) => ({ id })),
    options: [
      {
        title: "Material",
        values: [
        "Vincent Fabric"
        ]
      },
      {
        title: "Wood",
        values: [
        "Oak"
        ]
      }
    ],
    variants: [
      {
        title: "Vincent Dining Chair, Oak",
        sku: "41960031",
        options: {
          "Material": "Vincent Fabric",
          "Wood": "Oak"
},
        manage_inventory: false,
        prices: [
          {
            amount: 27900,
            currency_code: 'usd',
          },
          {
            amount: 27900,
            currency_code: 'usd',
            region_id,
          },
        ],
      }
    ],
  },
  {
    title: "Grace Cereal Bowls, Set of 4",
    description: "Grace brings a romantic flair to the dining table, with a vintage rib pattern that exudes elegance and charm.",
    handle: "grace-cereal-bowls-set-of-4",
    status: ProductStatus.PUBLISHED,
    thumbnail: "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710840472/crusader/variants/50430004-LGY/Grace-Light-Grey-Cereal-Bowls-Set-of-4_Front-1710840469.png",
    shipping_profile_id,
    category_ids: [categories.find(c => c.name === "Cereal Bowls")?.id, categories.find(c => c.name === "Tableware")?.id].filter(Boolean),
    tag_ids: [tags.find(t => t.value === "storewide_sale")?.id, tags.find(t => t.value === "c&c_accessories")?.id, tags.find(t => t.value === "storewide exclude beige covers")?.id, tags.find(t => t.value === "all_accessories")?.id, tags.find(t => t.value === "all products")?.id, tags.find(t => t.value === "gss event storewide sale excluding gwp")?.id, tags.find(t => t.value === "all product excluding customisation")?.id, tags.find(t => t.value === "homeware launch")?.id, tags.find(t => t.value === "match & save")?.id].filter(Boolean),
    collection_id: collections.find(c => c.title === "Grace Collection")?.id,
    images: [
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710840472/crusader/variants/50430004-LGY/Grace-Light-Grey-Cereal-Bowls-Set-of-4_Front-1710840469.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1715064517/crusader/variants/50430004-LGY/Grace-4-Light-Grey-White-Dinnerware-Set-Square-Set_1-1715064517.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710840472/crusader/variants/50430004-LGY/Grace-Cereal-Bowl-Light-Grey-Square-Det_1-1710840469.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1715064517/crusader/variants/50430004-LGY/Grace-Collection-Square-Set_1-1715064517.jpg"
      }
],
    sales_channels: sales_channels.map(({ id }) => ({ id })),
    options: [
      {
        title: "Colour",
        values: [
        "Light Grey",
        "Snow White"
        ]
      }
    ],
    variants: [
      {
        title: "Grace Light Grey Cereal Bowls, Set of 4",
        sku: "50430004-LGY",
        options: {
          "Colour": "Light Grey"
},
        manage_inventory: false,
        prices: [
          {
            amount: 5900,
            currency_code: 'usd',
          },
          {
            amount: 5900,
            currency_code: 'usd',
            region_id,
          },
        ],
      },
      {
        title: "Grace Snow White Cereal Bowls, Set of 4",
        sku: "50430004-SWE",
        options: {
          "Colour": "Snow White"
},
        manage_inventory: false,
        prices: [
          {
            amount: 5900,
            currency_code: 'usd',
          },
          {
            amount: 5900,
            currency_code: 'usd',
            region_id,
          },
        ],
      }
    ],
  },
  {
    title: "Audrey Salad Plates, Set of 4",
    description: "With a clay-like finish and inviting earthy tones, Audrey's handcrafted rim adds further definition and character to this stoneware collection.",
    handle: "audrey-salad-plates-set-of-4",
    status: ProductStatus.PUBLISHED,
    thumbnail: "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710838405/crusader/variants/50430009-SND/Audrey-Sand-Salad-Plates-Set-of-4_Front-1710838402.png",
    shipping_profile_id,
    category_ids: [categories.find(c => c.name === "Salad Plates")?.id, categories.find(c => c.name === "Tableware")?.id].filter(Boolean),
    tag_ids: [tags.find(t => t.value === "storewide_sale")?.id, tags.find(t => t.value === "c&c_accessories")?.id, tags.find(t => t.value === "storewide exclude beige covers")?.id, tags.find(t => t.value === "all_accessories")?.id, tags.find(t => t.value === "all products")?.id, tags.find(t => t.value === "gss event storewide sale excluding gwp")?.id, tags.find(t => t.value === "all product excluding customisation")?.id, tags.find(t => t.value === "homeware launch")?.id, tags.find(t => t.value === "match & save")?.id].filter(Boolean),
    
    images: [
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710838405/crusader/variants/50430009-SND/Audrey-Sand-Salad-Plates-Set-of-4_Front-1710838402.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1715065341/crusader/variants/50430009-SND/Audrey-4-Piece-Sand-Dinnerware-Set-Square-Set_1-1715065341.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710838425/crusader/variants/50430009-SND/Audrey-Sand-Dinner-Plate-Square-Det_1-1710838423.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1715065341/crusader/variants/50430009-SND/Audrey-20-Piece-Sand-Dinnerware-Set-Square-Set_1-1715065340.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710838643/crusader/variants/50430009-BCY/Audrey-Collection-Square-Set_1-1710838640.jpg"
      }
],
    sales_channels: sales_channels.map(({ id }) => ({ id })),
    options: [
      {
        title: "Colour",
        values: [
        "Brick Red",
        "Brown Clay",
        "Sand"
        ]
      }
    ],
    variants: [
      {
        title: "Audrey Sand Salad Plates, Set of 4",
        sku: "50430009-SND",
        options: {
          "Colour": "Sand"
},
        manage_inventory: false,
        prices: [
          {
            amount: 5500,
            currency_code: 'usd',
          },
          {
            amount: 5500,
            currency_code: 'usd',
            region_id,
          },
        ],
      },
      {
        title: "Audrey Brick Red Salad Plates, Set of 4",
        sku: "50430009-BRD",
        options: {
          "Colour": "Brick Red"
},
        manage_inventory: false,
        prices: [
          {
            amount: 5500,
            currency_code: 'usd',
          },
          {
            amount: 5500,
            currency_code: 'usd',
            region_id,
          },
        ],
      },
      {
        title: "Audrey Brown Clay Salad Plates, Set of 4",
        sku: "50430009-BCY",
        options: {
          "Colour": "Brown Clay"
},
        manage_inventory: false,
        prices: [
          {
            amount: 5500,
            currency_code: 'usd',
          },
          {
            amount: 5500,
            currency_code: 'usd',
            region_id,
          },
        ],
      }
    ],
  },
  {
    title: "Audrey Serving Bowls, Set of 4",
    description: "With a clay-like finish and inviting earthy tones, Audrey's handcrafted rim adds further definition and character to this stoneware collection.",
    handle: "audrey-serving-bowls-set-of-4",
    status: ProductStatus.PUBLISHED,
    thumbnail: "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710838739/crusader/variants/50430010-BRD/Audrey-Brick-Red-Serving-Bowls-Set-of-4_Front-1710838736.png",
    shipping_profile_id,
    category_ids: [categories.find(c => c.name === "Serving Bowls")?.id, categories.find(c => c.name === "Tableware")?.id].filter(Boolean),
    tag_ids: [tags.find(t => t.value === "storewide_sale")?.id, tags.find(t => t.value === "c&c_accessories")?.id, tags.find(t => t.value === "storewide exclude beige covers")?.id, tags.find(t => t.value === "all_accessories")?.id, tags.find(t => t.value === "all products")?.id, tags.find(t => t.value === "gss event storewide sale excluding gwp")?.id, tags.find(t => t.value === "all product excluding customisation")?.id, tags.find(t => t.value === "homeware launch")?.id, tags.find(t => t.value === "match & save")?.id].filter(Boolean),
    
    images: [
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710838739/crusader/variants/50430010-BRD/Audrey-Brick-Red-Serving-Bowls-Set-of-4_Front-1710838736.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1715065625/crusader/variants/50430010-BRD/Audrey-4-Piece-Brick-Red-Dinnerware-Set-Square-Set_1-1715065625.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710838755/crusader/variants/50430010-BRD/Audrey-Brick-Red-Serving-Bowl-Square-Det_1-1710838753.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1715065625/crusader/variants/50430010-BRD/Audrey-20-Piece-Brick-Red-Dinnerware-Set-Square-Set_1-1715065625.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710838844/crusader/variants/50430010-BCY/Audrey-Collection-Square-Set_1-1710838842.jpg"
      }
],
    sales_channels: sales_channels.map(({ id }) => ({ id })),
    options: [
      {
        title: "Colour",
        values: [
        "Brick Red",
        "Brown Clay"
        ]
      }
    ],
    variants: [
      {
        title: "Audrey Brick Red Serving Bowls, Set of 4",
        sku: "50430010-BRD",
        options: {
          "Colour": "Brick Red"
},
        manage_inventory: false,
        prices: [
          {
            amount: 6500,
            currency_code: 'usd',
          },
          {
            amount: 6500,
            currency_code: 'usd',
            region_id,
          },
        ],
      },
      {
        title: "Audrey Brown Clay Serving Bowls, Set of 4",
        sku: "50430010-BCY",
        options: {
          "Colour": "Brown Clay"
},
        manage_inventory: false,
        prices: [
          {
            amount: 6500,
            currency_code: 'usd',
          },
          {
            amount: 6500,
            currency_code: 'usd',
            region_id,
          },
        ],
      }
    ],
  },
  {
    title: "Audrey Cereal Bowls, Set of 4",
    description: "With a clay-like finish and inviting earthy tones, Audrey's handcrafted rim adds further definition and character to this stoneware collection.",
    handle: "audrey-cereal-bowls-set-of-4",
    status: ProductStatus.PUBLISHED,
    thumbnail: "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710838900/crusader/variants/50430011-SND/Audrey-Sand-Cereal-Bowls-Set-of-4_Front-1710838898.png",
    shipping_profile_id,
    category_ids: [categories.find(c => c.name === "Cereal Bowls")?.id, categories.find(c => c.name === "Tableware")?.id].filter(Boolean),
    tag_ids: [tags.find(t => t.value === "storewide_sale")?.id, tags.find(t => t.value === "c&c_accessories")?.id, tags.find(t => t.value === "storewide exclude beige covers")?.id, tags.find(t => t.value === "all_accessories")?.id, tags.find(t => t.value === "all products")?.id, tags.find(t => t.value === "gss event storewide sale excluding gwp")?.id, tags.find(t => t.value === "all product excluding customisation")?.id, tags.find(t => t.value === "homeware launch")?.id, tags.find(t => t.value === "match & save")?.id].filter(Boolean),
    
    images: [
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710838900/crusader/variants/50430011-SND/Audrey-Sand-Cereal-Bowls-Set-of-4_Front-1710838898.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1715065593/crusader/variants/50430011-SND/Audrey-4-Piece-Sand-Dinnerware-Set-Square-Set_1-1715065593.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710838900/crusader/variants/50430011-SND/Audrey-Sand-Serving-Bowl-Square-Det_1-1710838898.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1715065592/crusader/variants/50430011-SND/Audrey-20-Piece-Sand-Dinnerware-Set-Square-Set_1-1715065592.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710838868/crusader/variants/50430011-BCY/Audrey-Collection-Square-Set_1-1710838865.jpg"
      }
],
    sales_channels: sales_channels.map(({ id }) => ({ id })),
    options: [
      {
        title: "Colour",
        values: [
        "Brick Red",
        "Brown Clay",
        "Sand"
        ]
      }
    ],
    variants: [
      {
        title: "Audrey Sand Cereal Bowls, Set of 4",
        sku: "50430011-SND",
        options: {
          "Colour": "Sand"
},
        manage_inventory: false,
        prices: [
          {
            amount: 5500,
            currency_code: 'usd',
          },
          {
            amount: 5500,
            currency_code: 'usd',
            region_id,
          },
        ],
      },
      {
        title: "Audrey Brick Red Cereal Bowls, Set of 4",
        sku: "50430011-BRD",
        options: {
          "Colour": "Brick Red"
},
        manage_inventory: false,
        prices: [
          {
            amount: 5500,
            currency_code: 'usd',
          },
          {
            amount: 5500,
            currency_code: 'usd',
            region_id,
          },
        ],
      },
      {
        title: "Audrey Brown Clay Cereal Bowls, Set of 4",
        sku: "50430011-BCY",
        options: {
          "Colour": "Brown Clay"
},
        manage_inventory: false,
        prices: [
          {
            amount: 5500,
            currency_code: 'usd',
          },
          {
            amount: 5500,
            currency_code: 'usd',
            region_id,
          },
        ],
      }
    ],
  }
];
