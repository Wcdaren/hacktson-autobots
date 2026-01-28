import { CreateProductWorkflowInputDTO, ProductCollectionDTO, ProductTagDTO } from '@medusajs/framework/types';
import { ProductStatus } from '@medusajs/utils';

/**
 * Products imported from Castlery Production API (Enhanced)
 * Generated on: 2026-01-27T06:32:15.036Z
 * Total products: 36
 * Source: Castlery Sitemap + Production API (https://apigw-sg-prod.castlery.com/v2)
 * 
 * Enhanced Features:
 * - Variant-specific images (each variant has its own gallery)
 * - Product metadata (material, care, dimensions, comfort ratings)
 * - Variant metadata (fabric composition, etc.)
 * - Original price (list_price) for sale display
 * - Option swatch images preserved in metadata
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

/**
 * Variant images map - stores images for each variant by SKU
 * This can be used to update variant images after product creation
 */
export const variantImagesMap: Record<string, string[]> = {
  "40280045": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1696932993/crusader/variants/40280045/Crescent-1-Drawer-Nightstand-Front-1696932991.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1696932993/crusader/variants/40280045/Crescent-1-Drawer-Nightstand-Angle-1696932991.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1696932993/crusader/variants/40280045/Crescent-1-Drawer-Nightstand-Side-1696932991.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1696932993/crusader/variants/40280045/Crescent-1-Drawer-Nightstand-Back-1696932991.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1697772652/crusader/variants/40280045/Crescent-1-Drawer-Nightstand-Square-Set_4-1697772649.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1697772796/crusader/variants/40280045/Crescent-1-Drawer-Nightstand-Square-Set_3-1697772793.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1698633733/crusader/variants/PB-001230/Cresent-Bed-With-2-1-Drawer-Nightstand-Square-Set_1-1698633730.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1697772699/crusader/variants/40280045/Dawson-non-storage-bed-Seagull-Square-Set_2-1697772696.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1697772652/crusader/variants/40280045/Crescent-1-Drawer-Nightstand-Square-Det_1-1697772649.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1697622987/crusader/variants/40280045/Crescent-1-Drawer-Nightstand-With-2-Drawer-Nightstand-1697622984.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1696933397/crusader/variants/40280045/Crescent-2-Drawer-Nightstand-Square-Det_1-1696933394.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1731308875/crusader/variants/40280045/Crescent-6-Drawer-Dresser-Square-Det_10-1731308872.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1696933589/crusader/variants/T40280045/Crescent-1-Drawer-Nightstand-Dim-1696933587.png"
  ],
  "40550099": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1623727286/crusader/variants/40550099/Seb-Extendable-Dining-Table-Front_2.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1623727285/crusader/variants/40550099/Seb-Extendable-Dining-Table-Front_1.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1623727284/crusader/variants/40550099/Seb-Extendable-Dining-Table-Angle_1.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1623727287/crusader/variants/40550099/Seb-Extendable-Dining-Table-Front_3.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1623727284/crusader/variants/40550099/Seb-Extendable-Dining-Table-Angle_2.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1623727288/crusader/variants/40550099/Seb-Extendable-Dining-Table-Side_2.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1639132600/crusader/variants/40550099/Seb-Extendable-Dining-Table-Set_1.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1624967127/crusader/variants/40550099/Seb-Dining-Table-Set1.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1624967129/crusader/variants/40550099/Seb-Dining-Table-Det5.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1624967129/crusader/variants/40550099/Seb-Dining-Table-Det4.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1680487447/crusader/variants/40550099/Seb-Extendable-Dining-Table-Det_2-1680487444.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1624967128/crusader/variants/40550099/Seb-Dining-Table-Det3.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1631772569/crusader/variants/40550099/Seb-texture.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1705651498/crusader/variants/T40550099/Seb-Extendable-Dining-Table-Dim-1705651495.png"
  ],
  "40550217": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1689073156/crusader/variants/40550217/Casa-Sideboard-Front-1689073153.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1689073156/crusader/variants/40550217/Casa-Sideboard-Front_1-1689073153.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1689073156/crusader/variants/40550217/Casa-Sideboard-Angle-1689073153.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1689073155/crusader/variants/40550217/Casa-Sideboard-Side-1689073153.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1689073156/crusader/variants/40550217/Casa-Sideboard-Back-1689073153.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692345583/crusader/variants/40550217/Casa-Sideboard-Square-Set_1-1692345581.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692345906/crusader/variants/40550217/Casa-Sideboard-Square-Set_3-1692345903.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692605325/crusader/variants/40550217/Casa-Sideboard-Square-Det_4-1692605322.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692426202/crusader/variants/40550217/Casa-Sideboard-Square-Det_3-1692426200.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1689153850/crusader/variants/40550217/Casa-Sideboard-Square-Det_6-1689153847.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1689154005/crusader/variants/T40550217/Casa-Sideboard-Dim-1689154002.png"
  ],
  "40550220": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1689156425/crusader/variants/40550220/Casa-TV-Console-Front-1689156422.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1689156424/crusader/variants/40550220/Casa-TV-Console-Front_1-1689156422.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1689156425/crusader/variants/40550220/Casa-TV-Console-Angle-1689156422.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1689156424/crusader/variants/40550220/Casa-TV-Console-Side-1689156422.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1689156424/crusader/variants/40550220/Casa-TV-Console-Back-1689156422.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692349090/crusader/variants/40550220/Casa-TV-Console-Square-Set_1-1692349088.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692426584/crusader/variants/40550220/Casa-TV-Console-Square-Set_5-1692426581.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692758876/crusader/variants/40550220/Casa-TV-Console-Square-Set_6-1692758873.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692426704/crusader/variants/40550220/Casa-TV-Console-Square-Det_2-1692426702.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1689156911/crusader/variants/40550220/Casa-TV-Console-Square-Det_5-1689156908.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1689156910/crusader/variants/40550220/Casa-TV-Console-Square-Det_6-1689156908.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1689157022/crusader/variants/T40550220/Casa-TV-Console-Dim-1689157019.png"
  ],
  "40550223": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1711532302/crusader/variants/40550223/Casa-Console-Table-Angle-1711532300.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1711532302/crusader/variants/40550223/Casa-Console-Table-Angle1-1711532299.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1711532302/crusader/variants/40550223/Casa-Console-Table-Front-1711532300.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1711532302/crusader/variants/40550223/Casa-Console-Table-Side-1711532299.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692430819/crusader/variants/40550223/Casa-Console-Table-Square-Set_4-1692430817.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692606096/crusader/variants/40550223/Casa-Console-Table-Square-Set_2-1692606093.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1689232712/crusader/variants/40550223/Casa-Console-Table-Square-Det_2-1689232710.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1689232712/crusader/variants/40550223/Casa-Console-Table-Square-Det_1-1689232710.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692606111/crusader/variants/40550223/Casa-Dining-Table-Square-Det_1-1692606108.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1689233921/crusader/variants/T40550223/Casa-Console-Table-Dim-1689233919.png"
  ],
  "40550345": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1756455117/crusader/variants/40550345/Casa-TV-Console-150cm-Front-1756455114.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1756455116/crusader/variants/40550345/Casa-TV-Console-150cm-Angle-1756455114.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1756455117/crusader/variants/40550345/Casa-TV-Console-150cm-Side-1756455114.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1756455117/crusader/variants/40550345/Casa-TV-Console-150cm-Back-1756455114.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1756447589/crusader/variants/40550345/Casa-TV-Console-150cm-Square-Set_1-1756447587.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692349090/crusader/variants/40550220/Casa-TV-Console-Square-Set_1-1692349088.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692758876/crusader/variants/40550220/Casa-TV-Console-Square-Set_6-1692758873.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692426704/crusader/variants/40550220/Casa-TV-Console-Square-Det_2-1692426702.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1689156911/crusader/variants/40550220/Casa-TV-Console-Square-Det_5-1689156908.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1689156910/crusader/variants/40550220/Casa-TV-Console-Square-Det_6-1689156908.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1755071996/crusader/variants/T40550220/Casa-TV-Console-150cm-Dim-1755071994.png"
  ],
  "41960031": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1703744131/crusader/variants/41960031/Vincent-Dining-Chair-Oak-Angle-1703744129.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1703744131/crusader/variants/41960031/Vincent-Dining-Chair-Oak-Front-1703744129.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1703744131/crusader/variants/41960031/Vincent-Dining-Chair-Oak-Side-1703744129.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1703744131/crusader/variants/41960031/Vincent-Dining-Chair-Oak-Back-1703744129.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1705906803/crusader/variants/41960031/Vincent-Dining-Chair-Oak-Square-Set_1-1705906801.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1705906804/crusader/variants/41960031/Vincent-Dining-Table-With-6-Dining-Chair-Walnut-Square-Set_1-1705906801.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1705906803/crusader/variants/41960031/Vincent-Dining-Table-With-6-Dining-Chair-Walnut-Square-Set_2-1705906801.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1703744150/crusader/variants/41960031/Vincent-Dining-Chair-Oak-Square-Det_4-1703744147.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1703744150/crusader/variants/41960031/Vincent-Dining-Chair-Oak-Square-Det_3-1703744147.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1703744150/crusader/variants/41960031/Vincent-Dining-Chair-Oak-Square-Det_5-1703744147.jpg"
  ],
  "50220001": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1673927310/crusader/variants/50220001/Sawyer-TV-Console-Angle-1673927308.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1675760427/crusader/variants/50220001/Sawyer-TV-Console-Front-1675760425.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1673927310/crusader/variants/50220001/Sawyer-TV-Console-Front_1-1673927308.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1673927310/crusader/variants/50220001/Sawyer-TV-Console-Side-1673927308.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1673927310/crusader/variants/50220001/Sawyer-TV-Console-Back_-1673927308.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1677755596/crusader/variants/50220001/Sawyer-TV-Stand-Square-Set_1-1677755593.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1678342015/crusader/variants/50220001/Sawyer-TV-Stand-Square-Det_2-1678342013.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1679369980/crusader/variants/50220001/Sawyer-Sideboard_Copy-1679369978.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1678341923/crusader/variants/50220001/Sawyer-TV-Stand-Square-Set_2-1678341920.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1676864857/crusader/variants/50220001/Sawyer-Wood-Disclamer-1676864855.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1675847359/crusader/variants/50220001/Sawyer-TV-Console-Dim-1675847357.png"
  ],
  "50220003": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1673937390/crusader/variants/50220003/Dillon-Extendable-Dining-Table-190cm-Front_1-1673937388.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1673937390/crusader/variants/50220003/Dillon-Extendable-Dining-Table-190cm-Angle_2-1673937388.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1673937390/crusader/variants/50220003/Dillon-Extendable-Dining-Table-190cm-Side-1673937388.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1673937635/crusader/variants/50220003/Dillon-Extendable-Dining-Table-190cm-Front-1673937633.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1673937390/crusader/variants/50220003/Dillon-Extendable-Dining-Table-190cm-Angle-1673937388.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1676537490/crusader/variants/50220003/Dillon-Extendable-Dining-Table-280cm-Set_2-1676537487.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1676537676/crusader/variants/50220003/Dillon-Extendable-Dining-Table-280cm-Set_1-1676537673.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1700453966/crusader/variants/50220003/Austen-Dining-Arm-Chair-White-Wash-Square-Set_3-1700453963.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1673937416/crusader/variants/50220003/Dillon-Extendable-Dining-Table-190cm-Det_1-1673937414.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1673937416/crusader/variants/50220003/Dillon-Extendable-Dining-Table-190cm-Det_2-1673937414.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1673937416/crusader/variants/50220003/Dillon-Extendable-Dining-Table-190cm-Det_3-1673937414.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1673937417/crusader/variants/50220003/Dillon-Extendable-Dining-Table-190cm-Det_4-1673937414.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1676537856/crusader/variants/50220003/Dillon-Wood-Disclamer-1676537853.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1673938028/crusader/variants/50220003/Dillon-Extendable-Dining-Table-190cm-Dim-1673938026.png"
  ],
  "50220010": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692436666/crusader/variants/50220010/Sawyer-Rectangular-Coffee-Table-120cm_-Angle-1692436664.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692436666/crusader/variants/50220010/Sawyer-Rectangular-Coffee-Table-120cm_-Front-1692436664.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692436665/crusader/variants/50220010/Sawyer-Rectangular-Coffee-Table-120cm_-Side-1692436663.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692437049/crusader/variants/50220010/Sawyer-Rectangular-Coffee-Table-Square-Set_1-1692437047.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1700536994/crusader/variants/50220010/Auburn-Performance-Boucle-Extended-3-Seater-Sofa-Basalt-Square-Set_5-1700536991.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1700536994/crusader/variants/50220010/Auburn-Performance-Boucle-Curve-L-Shape-Sectional-Sofa-Basalt-With-2-Rectangular-Storage-Console-Black-Square-Set_4-1700536991.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692436990/crusader/variants/50220010/Sawyer-Rectangular-Coffee-Table-120cm_-Det_3-1692436988.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692437020/crusader/variants/50220010/Sawyer-Rectangular-Coffee-Table-120cm_-Det_4-1692437018.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692435335/crusader/variants/50220010/Sawyer-Wood-Disclamer-1692435333.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692437137/crusader/variants/T50220010/Sawyer-Rectangular-Coffee-Table-120cm_-Dim-1692437135.png"
  ],
  "50520005": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1678698647/crusader/variants/50520005/Sloane-Dining-Bench-150cm-Grey-Oak-Angle-1678698645.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710500786/crusader/variants/50520005/Sloane-Dining-Bench-150cm-Grey-Oak-Front-1710500784.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1678698647/crusader/variants/50520005/Sloane-Dining-Bench-150cm-Grey-Oak-Side-1678698645.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1678699742/crusader/variants/T50441109-LE4016/Sloane-Dining-Bench-Square-Set_1-1678699740.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710500804/crusader/variants/50520005/Sloane-Dining-Table-With-Dining-Bench-With-4-Cane-Chair-with-Armrest-Dune-Grey-Oak-Set_3-1710500801.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1678699069/crusader/variants/50520005/Sloane-Dining-Bench-Grey-Oak-Det_2-1678699067.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1678699345/crusader/variants/T50441109-LE4016/Sloane-Dining-Bench-Grey-Oak-Det_5-1678699343.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710927506/crusader/variants/TAS-000297/Sloane-Dining-Bench-150cm-Grey-Oak-Dim-1710927504.png"
  ],
  "50520006": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1679562782/crusader/variants/T504411010-LE4016/Sloane-Dining-Bench-180cm-Grey-Oak-Angle-1679562780.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710500848/crusader/variants/50520006/Sloane-Dining-Bench-180cm-Grey-Oak-Front-1710500846.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1679562876/crusader/variants/T504411010-LE4016/Sloane-Dining-Bench-180cm-Grey-Oak-Side-1679562874.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1678699707/crusader/variants/T504411010-LE4016/Sloane-Dining-Bench-Square-Set_1-1678699705.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710500849/crusader/variants/50520006/Sloane-Dining-Table-With-Dining-Bench-With-4-Cane-Chair-with-Armrest-Dune-Grey-Oak-Set_3-1710500846.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1678699069/crusader/variants/50520005/Sloane-Dining-Bench-Grey-Oak-Det_2-1678699067.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1678700026/crusader/variants/T504411010-LE4016/Sloane-Dining-Bench-Grey-Oak-Det_5-1678700023.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710927506/crusader/variants/TAS-000297/Sloane-Dining-Bench-180cm-Grey-Oak-Dim-1710927504.png"
  ],
  "52460065": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1624960646/crusader/variants/52460065/August-TV-Console-Front.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1627892951/crusader/variants/52460065/August-TV-Console-Dim.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1624960656/crusader/variants/52460065/August-TV-Console-Angle.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1624960660/crusader/variants/52460065/August-TV-Console-Side.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1624960662/crusader/variants/52460065/August-TV-Console-Back.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1624960642/crusader/variants/52460065/August-TV-Console-Lifestyle-Crop.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1624960647/crusader/variants/52460065/August-TV-Console-D4.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1624960651/crusader/variants/52460065/August-TV-Console-D9.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1624960649/crusader/variants/52460065/August-TV-Console-D6.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1624960645/crusader/variants/52460065/August-TV-Console-D2.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1624960648/crusader/variants/52460065/August-TV-Console-D5.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1624960650/crusader/variants/52460065/August-TV-Console-D8.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1624960647/crusader/variants/52460065/August-TV-Console-D3.jpg"
  ],
  "52460085": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1624960646/crusader/variants/52460065/August-TV-Console-Front.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1627892951/crusader/variants/52460065/August-TV-Console-Dim.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1624960656/crusader/variants/52460065/August-TV-Console-Angle.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1624960660/crusader/variants/52460065/August-TV-Console-Side.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1624960662/crusader/variants/52460065/August-TV-Console-Back.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1624960642/crusader/variants/52460065/August-TV-Console-Lifestyle-Crop.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1624960647/crusader/variants/52460065/August-TV-Console-D4.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1624960651/crusader/variants/52460065/August-TV-Console-D9.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1624960649/crusader/variants/52460065/August-TV-Console-D6.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1624960645/crusader/variants/52460065/August-TV-Console-D2.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1624960648/crusader/variants/52460065/August-TV-Console-D5.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1624960650/crusader/variants/52460065/August-TV-Console-D8.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1624960647/crusader/variants/52460065/August-TV-Console-D3.jpg"
  ],
  "50440921-IV": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709284607/crusader/variants/50440921-IV/Sierra-Outdoor-2-Seater-Sofa-Cover-Angle-ivory-1709284605.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709288688/crusader/variants/50440921-IV/Redesign-Sierra-Right-Facing-2-Seater-Sofa_-Cover_1-1709288686.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1695019330/crusader/variants/50440848-IV/Outdoor-Fabric_New_1_US-1695019329.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1708418410/crusader/variants/50440884-IV/Outdoor-Fabric_New-1708418407.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691118112/crusader/variants/50440845-IV/Sierra-Outdoor-Sofa-Cover-Sketch-Map-AU-1691118110.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709284626/crusader/variants/T50110042/Sierra-Outdoor-2-Seater-Sofa-Cover-ivory-Dim-1709284623.png"
  ],
  "50440926-IV": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709284649/crusader/variants/50440926-IV/Sierra-Outdoor-3-Seater-Sofa-Cover-Angle-ivory-1709284647.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709520492/crusader/variants/50440926-IV/Redesign-Sierra-3-Seater-Sofa__-Cover_1-1709520489.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1695019330/crusader/variants/50440848-IV/Outdoor-Fabric_New_1_US-1695019329.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1708418410/crusader/variants/50440884-IV/Outdoor-Fabric_New-1708418407.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691118112/crusader/variants/50440845-IV/Sierra-Outdoor-Sofa-Cover-Sketch-Map-AU-1691118110.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709284698/crusader/variants/T50110041/Sierra-Outdoor-3-Seater-Sofa-Cover-ivory-Dim-1709284696.png"
  ],
  "50440920-IV": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709284722/crusader/variants/50440920-IV/Sierra-Outdoor-Lounge-Chair-Cover-Angle-ivory-1709284720.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709288799/crusader/variants/50440920-IV/Redesign-Sierra-Lounge-Chair-Cover_1-1709288797.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1695019330/crusader/variants/50440848-IV/Outdoor-Fabric_New_1_US-1695019329.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1708418410/crusader/variants/50440884-IV/Outdoor-Fabric_New-1708418407.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691118112/crusader/variants/50440845-IV/Sierra-Outdoor-Sofa-Cover-Sketch-Map-AU-1691118110.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709284742/crusader/variants/T50110040/Sierra-Outdoor-Lounge-Chair-Cover-ivory-Dim-1709284740.png"
  ],
  "50440750-AM4001": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1646386187/crusader/variants/50440750-AM4001/Madison-3-Seater-Sofa-Bisque-Front-SG.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1646386187/crusader/variants/50440750-AM4001/Madison-3-Seater-Sofa-Bisque-Angle-SG.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1645670446/crusader/variants/50440728-AM4001/Madison-3-Seater-Sofa-Bisque-Side.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1743557693/crusader/variants/50440750-AM4001/Madison-3-Seater-Sofa-Bisque-Back-SG-1743557690.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1645670813/crusader/variants/50440728-AM4001/Madison-3-Seater-Sofa-Bisque-Square-Set_5.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1645688196/crusader/variants/50440728-AM4001/Madison-Sofa-Collection-Bisque-Square-Set_1.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1716790934/crusader/variants/50440728-AM4001/Owen-Sofa-Headrest-Opal-Beige-Square-Det_10-1716790934.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1645670873/crusader/variants/50440728-AM4001/Madison-3-Seater-Sofa-Bisque-Square-Det_4.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1645670873/crusader/variants/50440728-AM4001/Madison-3-Seater-Sofa-Bisque-Square-Det_2.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1645670873/crusader/variants/50440728-AM4001/Madison-3-Seater-Sofa-Bisque-Square-Det_5.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1645670872/crusader/variants/50440728-AM4001/Madison-3-Seater-Sofa-Bisque-Square-Det_3.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1655221832/crusader/variants/50440750-AM4001/Madison-3-Seater-Sofa-Bisque-Dim-SG-1655221829.png"
  ],
  "50440750-TW4002": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1625218999/crusader/variants/50440750-TW4002/Madison-3-Seater-Sofa-Stone-Front.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1625218970/crusader/variants/50440750-TW4002/Madison-3-Seater-Sofa-Stone-Angle.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1625219005/crusader/variants/50440750-TW4002/Madison-3-Seater-Sofa-Stone-Side.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1625218985/crusader/variants/50440750-TW4002/Madison-3-Seater-Sofa-Stone-Back.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1625417380/crusader/variants/50440750-TW4002/Madison-3-Seater-Sofa-Stone-Lifestyle-Crop.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1625417372/crusader/variants/50440750-TW4002/Madison-3-Seater-Sofa-Stone-D6.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1625417364/crusader/variants/50440750-TW4002/Madison-3-Seater-Sofa-Stone-D9.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1717399516/crusader/variants/50440750-TW4002/Owen-Sofa-Headrest-Opal-Beige-Square-Det_10-1717399514.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1625417373/crusader/variants/50440750-TW4002/Madison-Armchair-Stone-D3.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1625417371/crusader/variants/50440750-TW4002/Madison-Armchair-Stone-D4.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1625417369/crusader/variants/50440750-TW4002/Madison-Ottoman-Stone-D5.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1625417366/crusader/variants/50440750-TW4002/Madison-3-Seater-Sofa-Stone-D8.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1655221061/crusader/variants/50440750-TW4002/Madison-3-Seater-Sofa-Stone-Dim-1655221058.png"
  ],
  "50440750-CM4001": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757405355/crusader/variants/50440728-CM4001/Madison-3-Seater-Sofa-Forest-Front-1757405355.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757405355/crusader/variants/50440728-CM4001/Madison-3-Seater-Sofa-Forest-Angle-1757405355.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757405354/crusader/variants/50440728-CM4001/Madison-3-Seater-Sofa-Forest-Side-1757405354.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757405355/crusader/variants/50440728-CM4001/Madison-3-Seater-Sofa-Forest-Back-1757405355.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1760166303/crusader/variants/50440728-CM4001/Madison-3-Seater-Sofa-Forest-Square-Set_2-1760166303.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1760166303/crusader/variants/50440728-CM4001/Madison-3-Seater-Sofa-With-Ottoman-Forest-Square-Set_1-1760166303.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1760166302/crusader/variants/50440728-CM4001/Madison-3-Seater-Sofa-With-Armchair-Forest-Square-Set_1-1760166302.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1716790310/crusader/variants/PB-000850-AM4001/Owen-Sofa-Headrest-Opal-Beige-Square-Det_10-1716790310.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1760166303/crusader/variants/50440728-CM4001/Madison-3-Seater-Sofa-With-Ottoman-Forest-Square-Det_2-1760166303.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1760166303/crusader/variants/50440728-CM4001/Madison-3-Seater-Sofa-With-Ottoman-Forest-Square-Det_1-1760166303.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757405355/crusader/variants/50440728-CM4001/Madison-3-Seater-Sofa-Forest-Det_2-1757405355.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757405354/crusader/variants/50440728-CM4001/Madison-3-Seater-Sofa-Forest-Det_4-1757405354.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757405355/crusader/variants/50440728-CM4001/Madison-3-Seater-Sofa-Forest-Det_1-1757405355.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1754899654/crusader/variants/T50440750/Madison-3-Seater-Sofa-Forest-Dim-SG-1754899652.png"
  ],
  "50440922-IV": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709284814/crusader/variants/50440922-IV/Sierra-Outdoor-Coffee-Table-Cover-Angle-ivory-1709284811.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709288816/crusader/variants/50440922-IV/Redesign-Sierra-Coffee-Table-Cover_1-1709288814.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1695019330/crusader/variants/50440848-IV/Outdoor-Fabric_New_1_US-1695019329.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1708418410/crusader/variants/50440884-IV/Outdoor-Fabric_New-1708418407.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691118112/crusader/variants/50440845-IV/Sierra-Outdoor-Sofa-Cover-Sketch-Map-AU-1691118110.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709284829/crusader/variants/T50110044/Sierra-Outdoor-Coffee-Table-Cover-ivory-Dim-1709284826.png"
  ],
  "50720011-CO4001": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709274106/crusader/variants/50720011-CO4001/Redesign-Sierra-Right-Facing-2-Seater-Sofa_-Front-1709274104.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709274107/crusader/variants/50720011-CO4001/Redesign-Sierra-Right-Facing-2-Seater-Sofa_-Angle-1709274104.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709274106/crusader/variants/50720011-CO4001/Redesign-Sierra-Right-Facing-2-Seater-Sofa_-Side-1709274104.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709274106/crusader/variants/50720011-CO4001/Redesign-Sierra-Right-Facing-2-Seater-Sofa_-Back-1709274104.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709798070/crusader/variants/50720009-CO4001/Redesign-Sierra-3-Seater-Sofa-Copy-1709798063.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709274709/crusader/variants/50720011-CO4001/Redesign-Sierra-3-Seater-Sofa-Det_3-1709274702.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709274709/crusader/variants/50720011-CO4001/Redesign-Sierra-3-Seater-Sofa-Det_8-1709274702.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709274709/crusader/variants/50720011-CO4001/Redesign-Sierra-3-Seater-Sofa-Det_9-1709274702.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709274704/crusader/variants/50720011-CO4001/Redesign-Sierra-3-Seater-Sofa-Det_11-1709274702.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709275279/crusader/variants/T50110036/Redesign-Sierra-Right-Facing-2-Seater-Sofa_-Dim-1709275276.png"
  ],
  "AS-000518-CO4001": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709520874/crusader/variants/AS-000518-CO4001/Redesign-Sierra-Right-Facing-2-Seater-Sofa_-Cover-1709520871.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709275179/crusader/variants/AS-000518-CO4001/Redesign-Sierra-Right-Facing-2-Seater-Sofa_-Front-1709275176.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709275179/crusader/variants/AS-000518-CO4001/Redesign-Sierra-Right-Facing-2-Seater-Sofa_-Angle-1709275176.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709275179/crusader/variants/AS-000518-CO4001/Redesign-Sierra-Right-Facing-2-Seater-Sofa_-Side-1709275176.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709275179/crusader/variants/AS-000518-CO4001/Redesign-Sierra-Right-Facing-2-Seater-Sofa_-Back-1709275176.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709798070/crusader/variants/50720009-CO4001/Redesign-Sierra-3-Seater-Sofa-Copy-1709798063.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709275205/crusader/variants/AS-000518-CO4001/Redesign-Sierra-3-Seater-Sofa-Det_3-1709275198.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709275205/crusader/variants/AS-000518-CO4001/Redesign-Sierra-3-Seater-Sofa-Det_9-1709275199.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709275205/crusader/variants/AS-000518-CO4001/Redesign-Sierra-3-Seater-Sofa-Det_8-1709275198.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709275201/crusader/variants/AS-000518-CO4001/Redesign-Sierra-3-Seater-Sofa-Det_11-1709275198.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691118112/crusader/variants/50440845-IV/Sierra-Outdoor-Sofa-Cover-Sketch-Map-AU-1691118110.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709275293/crusader/variants/T50110036/Redesign-Sierra-Right-Facing-2-Seater-Sofa_-Dim-1709275290.png"
  ],
  "AS-000374-NG4001": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1634716861/crusader/variants/T50440986-NG4001/Dawson-3-Seater-Sofa-Beach-Linen-Front.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1634716861/crusader/variants/T50440986-NG4001/Dawson-3-Seater-Sofa-Beach-Linen-Angle.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1634716860/crusader/variants/T50440986-NG4001/Dawson-3-Seater-Sofa-Beach-Linen-Side.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1634716879/crusader/variants/T50440986-NG4001/Dawson-3-Seater-Sofa-Beach-Linen-Back.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1640249245/crusader/variants/T50440986-NG4001/Dawson-Sofa-With-Ottoman-Beach-Linen-Square-Set_5.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1706000281/crusader/variants/AS-000374-NG4001/Dawson-3-Seater-Sofa-With-Armchair-With-Ottoman-Seagull-Square-Set_2-1706000280.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1702897677/crusader/variants/AS-000374-NG4001/Dawson-Extended-Sofa-With-Ottoman-Beach-Linen-Set_1-1702897677.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1702897677/crusader/variants/AS-000374-NG4001/Dawson-Swivel-Armchair-Copy-1702897677.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1716861123/crusader/variants/AS-000227-NG4001/Sofa-Armrest-Table-Natural-Square-Set_4-1716861123.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1641546342/crusader/variants/T50440986-NG4001/Dawson-Chaise-Sectional-Sofa-Beach-Linen-Det_1.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1634714309/crusader/variants/54000042-NG4001/Dawson-Sofa-Beach-Linen-Square-Det_2.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1634714194/crusader/variants/54000042-NG4001/Dawson-Sofa-Beach-Linen-Square-Det_4.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1634714178/crusader/variants/54000042-NG4001/Dawson-Sofa-Beach-Linen-Square-Det_8.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1695372120/crusader/variants/TAS-000227/Dawson-3-Seater-Sofa-Beach-Linen-Dim-1695372118.png"
  ],
  "AS-000374-NG4002": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1697614106/crusader/variants/AS-000374-NG4002/Dawson-3-Seater-Sofa-Seagull-Front-1697614103.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1697614106/crusader/variants/AS-000374-NG4002/Dawson-3-Seater-Sofa-Seagull-Angle-1697614103.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1697614106/crusader/variants/AS-000374-NG4002/Dawson-3-Seater-Sofa-Seagull-Side-1697614103.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1697614106/crusader/variants/AS-000374-NG4002/Dawson-3-Seater-Sofa-Seagull-Back-1697614103.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1697616548/crusader/variants/AS-000374-NG4002/Dawson-3-Seater-Sofa-With-Armchair-With-Ottoman-Seagull-Square-Set_2-1697616545.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1697614172/crusader/variants/AS-000374-NG4002/Dawson-3-Seater-Sofa-With-Armchair-With-Ottoman-Seagull-Square-Set_5-1697614169.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1702897812/crusader/variants/AS-000374-NG4002/Dawson-3-Seater-Sofa-Seagull-Det_1-1702897808.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1697536241/crusader/variants/54000138-NG4002/Dawson-Swivel-Armchair-Seagull_Copy-1697536238.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1724057632/crusader/variants/AS-000374-NG4002/Sofa-Armrest-Table-Natural-Square-Set_4-1724057630.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1697536313/crusader/variants/54000138-NG4002/Dawson-Ottoman-Seagull-Det_1-1697536311.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1697536242/crusader/variants/54000138-NG4002/Dawson-3-Seater-Sofa-Seagull-Det_2-1697536239.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1697536241/crusader/variants/54000138-NG4002/Dawson-3-Seater-Sofa-Seagull-Det_3-1697536238.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1697536242/crusader/variants/54000138-NG4002/Dawson-3-Seater-Sofa-Seagull-Det_4-1697536239.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1697533968/crusader/variants/TAS-000227/Dawson-3-Seater-Sofa-Seagull-Dim-1697533965.png"
  ],
  "AS-000374C-TL4003": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1750410763/crusader/variants/AS-000374C-TL4003/Dawson-3-Seater-Sofa-Charcoal-Grey-Front-1750410761.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1720667585/crusader/variants/50440775C-TL4003/Charcoal-Grey-Twill_Adams_Owen-1720667583.jpg"
  ],
  "AS-000374C-VL4014": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1731313238/crusader/variants/AS-000374C-VL4014/Dawson-3-Seater-Sofa-Olive-Gold-Front-1731313235.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1720577374/crusader/variants/AS-000190C-VL4014-SV/Owen-3-Seater-Sofa-Royal-Gold-Det6-1720577372.jpg"
  ],
  "AS-000374C-TL4001": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1731313222/crusader/variants/AS-000374C-TL4001/Dawson-3-Seater-Sofa-Indigo-Blue-Front-1731313219.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1722476761/crusader/variants/AS-000374C-TL4001/Dawson-Sofa-Indigo-Blue-Campaign-Square-Det_1-1722476759.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1720765488/crusader/variants/AS-000374C-TL4001/Indigo-Blue-Twill_Owen-1720765485.jpg"
  ],
  "AS-000374C-TL4002": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1731313207/crusader/variants/AS-000374C-TL4002/Dawson-3-Seater-Sofa-Beige-Front-1731313204.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1720765466/crusader/variants/AS-000374C-TL4002/Owen-3-Seater-Sofa-Pearl-Beige-Det6-1720765464.jpg"
  ],
  "AS-000374C-PM4002": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1731313178/crusader/variants/AS-000374C-PM4002/Dawson-3-Seater-Sofa-Brilliant-White-Front-1731313175.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1720679390/crusader/variants/54000103C-PM4002/Brilliant-White-PlainWeave_Adams_Owen-1720679387.jpg"
  ],
  "AS-000374C-PY4001": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1730946379/crusader/variants/AS-000374C-PY4001/Dawson-3-Seater-Sofa-Ivory-Front-1730946377.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1722308046/crusader/variants/AS-000189C-PY4001-GD/Ivory-Swatch-Copy_1-1722308043.jpg"
  ],
  "AS-000374C-PY4002": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1730946413/crusader/variants/AS-000374C-PY4002/Dawson-3-Seater-Sofa-Dove-Grey-Front-1730946410.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1722308132/crusader/variants/AS-000189C-PY4002-GD/Dove-Grey-Swatch-Copy_1-1722308130.jpg"
  ],
  "AS-000374C-PM4001": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1731313159/crusader/variants/AS-000374C-PM4001/Dawson-3-Seater-Sofa-Smoke-Grey-Front-1731313156.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1722419565/crusader/variants/54000138C-PM4001/Performance-Smoke-Grey__2_-1722419563.jpg"
  ],
  "AS-000374C-PY4003": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1730946446/crusader/variants/AS-000374C-PY4003/Dawson-3-Seater-Sofa-Moss-Front-1730946444.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1722308164/crusader/variants/AS-000189C-PY4003-BLK/Moss-Swatch-Copy_1-1722308161.jpg"
  ],
  "AS-000374C-PT4001": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1731313137/crusader/variants/AS-000374C-PT4001/Dawson-3-Seater-Sofa-Creamy-White-Front-1731313134.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1720679601/crusader/variants/54000102C-PT4001/Creamy-White-Twill_Adams_Owen-1720679599.jpg"
  ],
  "AS-000374C-PY4004": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1730946570/crusader/variants/AS-000374C-PY4004/Dawson-3-Seater-Sofa-Cumin-Front-1730946567.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1722307826/crusader/variants/AS-000189C-PY4004-BLK/Cumin-Swathc-Copy_1-1722307823.jpg"
  ],
  "AS-000374C-IN4003": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1731313112/crusader/variants/AS-000374C-IN4003/Dawson-3-Seater-Sofa-Ginger-Front-1731313109.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1720679762/crusader/variants/54000102C-IN4003/Marlow_Ginger-1720679759.jpg"
  ],
  "AS-000374C-IN4002": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1731313073/crusader/variants/AS-000374C-IN4002/Dawson-3-Seater-Sofa-White-Quartz-Front-1731313071.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1720679628/crusader/variants/54000102C-IN4002/White-Quartz_1-1720679625.jpg"
  ],
  "50440750-LE4016": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1631157536/crusader/variants/50440750-LE4016/Madison-3-Seater-Sofa-Caramel-Front.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1631157809/crusader/variants/50440750-LE4016/Madison-3-Seater-Sofa-Caramel-Angle.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1631157921/crusader/variants/50440750-LE4016/Madison-3-Seater-Sofa-Caramel-Side.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1631157930/crusader/variants/50440750-LE4016/Madison-3-Seater-Sofa-Caramel-Back.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1631157511/crusader/variants/50440750-LE4016/Madison-Leather-3-Seater-Sofa-Caramel-Lifestyle-Crop.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1631157610/crusader/variants/50440750-LE4016/Madison-3-Seater-Sofa-Caramel-Square-Set_4.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1716790130/crusader/variants/50440728-LE4016/Owen-Sofa-Headrest-Opal-Beige-Square-Det_10-1716790129.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1680854820/crusader/variants/50440728-LE4016/Madison-Sofa-Lunar-New-Year-Campaign-Square-Set_13-1680854820.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1632991501/crusader/variants/50440750-LE4016/Jonathan-Texture.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1748500364/crusader/variants/T50440750-LE/Madison-3-Seater-Sofa-Caramel-Dim-SG-1748500361.png"
  ],
  "54000098-PT4001": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1684203626/crusader/variants/54000098-PT4001/Jonathan-Left-Chaise-Sofa-Creamy-White-Front-1684203624.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1684203670/crusader/variants/54000098-PT4001/Jonathan-Left-Chaise-Sofa-Creamy-White-Angle-1684203668.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1681976227/crusader/variants/54000098-PT4001/Jonathan-Left-Chaise-Sofa-Creamy-White-Side-1681976224.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1684203587/crusader/variants/54000098-PT4001/Jonathan-Left-Chaise-Sofa-Creamy-White-Back-1684203584.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1682046879/crusader/variants/54000098-PT4001/Jonathan-Extended-Side-Left-Chaise-Sofa-Creamy-White-Square-Det_2-1682046877.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1682046879/crusader/variants/54000098-PT4001/Jonathan-Side-Chaise-Sofa-Creamy-White-Square-Set_1_1-1682046877.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1683276724/crusader/variants/54000098-PT4001/Jonathan-Extended-Side-Left-Chaise-Sectional-Sofa-Creamy-White-Square-Set_4-1683276721.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1681976279/crusader/variants/54000098-PT4001/Jonathan-Side-Right-Chaise-Sofa-Creamy-White-Det_1-1681976276.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1683276849/crusader/variants/54000098-PT4001/Jonathan-Side-Right-Chaise-Sofa-Creamy-White-Det_2-1683276847.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1681976278/crusader/variants/54000098-PT4001/Jonathan-Side-Right-Chaise-Sofa-Creamy-White-Det_5-1681976276.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1681976408/crusader/variants/54000098-PT4001/Jonathan-Side-Right-Chaise-Sofa-Creamy-White-Det_6-1681976405.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1681977021/crusader/variants/T54000098/Jonathan-Left-Chaise-Sofa-Creamy-White-Dim-1681977019.png"
  ],
  "54000098-GI4001": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1681963448/crusader/variants/54000098-GI4001/Jonathan-Left-Chaise-Sofa-Zenith-Bule-Frone-1681963446.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1681963449/crusader/variants/54000098-GI4001/Jonathan-Left-Chaise-Sofa-Zenith-Bule-Angle-1681963446.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1681963448/crusader/variants/54000098-GI4001/Jonathan-Left-Chaise-Sofa-Zenith-Bule-Side-1681963446.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1681963448/crusader/variants/54000098-GI4001/Jonathan-Left-Chaise-Sofa-Zenith-Bule-Back-1681963446.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1683282413/crusader/variants/54000098-GI4001/Jonathan-Side-Left-Chaise-Sectional-Zenith-Bule-Det_12-1683282410.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1682044396/crusader/variants/54000098-GI4001/Jonathan-Side-Left-Chaise-Sofa-Zenith-Bule-Square-Set_1-1682044393.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1682059011/crusader/variants/54000098-GI4001/Jonathan-Extended-Side-Left-Chaise-Sectional-With-Ottoman-Zenith-Bule-Square-Set_1-1682059009.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1682059031/crusader/variants/54000098-GI4001/Jonathan-Extended-Side-Right-Chaise-Sectional-Zenith-Bule-Det_2-1682059028.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1682043830/crusader/variants/54000098-GI4001/Jonathan-Zenith-Blue-Det_1-1682043827.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1682043829/crusader/variants/54000098-GI4001/Jonathan-Sofa-Zenith-Blue-Det_7-1682043827.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1682043830/crusader/variants/54000098-GI4001/Jonathan-Zenith-Blue-Det_2-1682043827.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1681977075/crusader/variants/T54000098/Jonathan-Left-Chaise-Sofa-Zenith-Bule-Dim-1681977073.png"
  ],
  "54000098-GI4002": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1684220628/crusader/variants/54000098-GI4002/Jonathan-Side-Left-Chaise-Dark-Granite-Front_-1684220626.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1684220628/crusader/variants/54000098-GI4002/Jonathan-Side-Left-Chaise-Dark-Granite-Angle-1684220626.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1684220628/crusader/variants/54000098-GI4002/Jonathan-Side-Left-Chaise-Dark-Granite-Side_-1684220626.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1684220628/crusader/variants/54000098-GI4002/Jonathan-Side-Left-Chaise-Dark-Granite-Back_-1684220626.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1684374964/crusader/variants/54000098-GI4002/Jonathan-Side-Left-Chaise-Sectional-Sofa-Dark-Granite-Square-Det_1-1684374957.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1684375089/crusader/variants/54000098-GI4002/Jonathan-Side-Left-Chaise-Sofa-Dark-Granite-Square-Set_1-1684375086.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1684375089/crusader/variants/54000098-GI4002/Jonathan-Extended-Side-Left-Chaise-Sectional_-Sofa-Drak-Granite-Square-Set_2-1684375086.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1684220647/crusader/variants/54000098-GI4002/Jonathan-Sofa-Dark-Granite-Det_6-1684220644.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1684220647/crusader/variants/54000098-GI4002/Jonathan-Sofa-Dark-Granite-Det_4-1684220645.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1684220647/crusader/variants/54000098-GI4002/Jonathan-Sofa-Dark-Granite-Det_3-1684220645.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1684220647/crusader/variants/54000098-GI4002/Jonathan-Sofa-Dark-Granite-Det_2-1684220644.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1681977051/crusader/variants/T54000098/Jonathan-Side-Left-Chaise-Dark-Granite-Dim_-1681977049.png"
  ],
  "54000098C-TL4003": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721015308/crusader/variants/54000094C-TL4003/Jonathan-3-Seater-Sofa-Charcoal-Grey-Front-1721015306.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1720667585/crusader/variants/50440775C-TL4003/Charcoal-Grey-Twill_Adams_Owen-1720667583.jpg"
  ],
  "54000098C-VL4014": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721015288/crusader/variants/54000094C-VL4014/Jonathan-3-Seater-Sofa-Olive-Gold-Front-1721015285.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1720577374/crusader/variants/AS-000190C-VL4014-SV/Owen-3-Seater-Sofa-Royal-Gold-Det6-1720577372.jpg"
  ],
  "54000098C-TL4001": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721015260/crusader/variants/54000094C-TL4001/Jonathan-3-Seater-Sofa-Indigo-Blue-Front-1721015257.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721015260/crusader/variants/54000094C-TL4001/Indigo-Blue-Twill_Owen-1721015257.jpg"
  ],
  "54000098C-CY4003": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721015239/crusader/variants/54000094C-CY4003/Jonathan-3-Seater-Sofa-Light-Blush-Front-1721015236.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721015239/crusader/variants/54000094C-CY4003/Lexi-Bed-Light-Blush-Square-Det_3-1721015236.jpg"
  ],
  "54000098C-CY4001": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721015218/crusader/variants/54000094C-CY4001/Jonathan-3-Seater-Sofa-Frost-White-Front-1721015216.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721015218/crusader/variants/54000094C-CY4001/Frost-White_1-1721015216.jpg"
  ],
  "54000098C-TL4002": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721015191/crusader/variants/54000094C-TL4002/Jonathan-3-Seater-Sofa-Pearl-Beige-Front-1721015189.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721015190/crusader/variants/54000094C-TL4002/Owen-3-Seater-Sofa-Pearl-Beige-Det6-1721015188.jpg"
  ],
  "54000098C-PM4002": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721015170/crusader/variants/54000094C-PM4002/Jonathan-3-Seater-Sofa-Performance-Brilliant-White-Front-1721015168.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1720679390/crusader/variants/54000103C-PM4002/Brilliant-White-PlainWeave_Adams_Owen-1720679387.jpg"
  ],
  "54000098C-CY4002": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721015149/crusader/variants/54000094C-CY4002/Jonathan-3-Seater-Sofa-Nickel-Grey-Front-1721015147.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1722479254/crusader/variants/54000094C-CY4002/Nickel-Grey-1722479251.jpg"
  ],
  "54000098C-PY4001": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721015128/crusader/variants/54000094C-PY4001/Jonathan-3-Seater-Sofa-Ivory-Front-1721015126.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1722308046/crusader/variants/AS-000189C-PY4001-GD/Ivory-Swatch-Copy_1-1722308043.jpg"
  ],
  "54000098C-PY4002": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721015105/crusader/variants/54000094C-PY4002/Jonathan-3-Seater-Sofa-Dove-Grey-Front-1721015102.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1722308132/crusader/variants/AS-000189C-PY4002-GD/Dove-Grey-Swatch-Copy_1-1722308130.jpg"
  ],
  "54000098C-PM4001": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1722419258/crusader/variants/54000094C-PM4001/Jonathan-3-Seater-Sofa-Performance-Smoke-Grey-Front__2_-1722419256.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1722419113/crusader/variants/54000094C-PM4001/Smoke-Grey-PlainWeave_Adams-1722419111.jpg"
  ],
  "54000098C-PY4003": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721015053/crusader/variants/54000094C-PY4003/Jonathan-3-Seater-Sofa-Moss-Front-1721015050.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1722308164/crusader/variants/AS-000189C-PY4003-BLK/Moss-Swatch-Copy_1-1722308161.jpg"
  ],
  "54000098C-PY4004": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721121787/crusader/variants/54000098C-PY4004/Jonathan-3-Seater-Sofa-Cumin-Front-1721121785.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1722307826/crusader/variants/AS-000189C-PY4004-BLK/Cumin-Swathc-Copy_1-1722307823.jpg"
  ],
  "54000098C-IN4003": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721014828/crusader/variants/54000094C-IN4003/Jonathan-3-Seater-Sofa-Ginger-Front-1721014825.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1720679762/crusader/variants/54000102C-IN4003/Marlow_Ginger-1720679759.jpg"
  ],
  "54000098C-IN4002": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721014807/crusader/variants/54000094C-IN4002/Jonathan-3-Seater-Sofa-White-Quartz-Front-1721014804.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1720679628/crusader/variants/54000102C-IN4002/White-Quartz_1-1720679625.jpg"
  ],
  "AS-000297-LE4016": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1678698648/crusader/variants/50520005/Sloane-Dining-Bench-150cm-Grey-Oak-With-Leather-Cushion-Angle-1678698646.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1678698647/crusader/variants/50520005/Sloane-Dining-Bench-150cm-Grey-Oak-With-Leather-Cushion-Front-1678698645.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1678698647/crusader/variants/50520005/Sloane-Dining-Bench-150cm-Grey-Oak-With-Leather-Cushion-Side-1678698645.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1678698647/crusader/variants/50520005/Sloane-Dining-Bench-150cm-Grey-Oak-Angle-1678698645.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1678698647/crusader/variants/50520005/Sloane-Dining-Bench-150cm-Grey-Oak-Side-1678698645.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1678698986/crusader/variants/50520005/Sloane-Dining-Bench-Square-Set_2-1678698984.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1678699006/crusader/variants/50520005/Sloane-Dining-Table-With-Dining-Bench-With-4-Cane-and-Leather-Chair-with-Armrest-Caramel-Black-Square-Set_3-1678699004.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1678699742/crusader/variants/T50441109-LE4016/Sloane-Dining-Bench-Square-Set_1-1678699740.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1678699069/crusader/variants/50520005/Sloane-Dining-Bench-Grey-Oak-Det_2-1678699067.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1678699069/crusader/variants/50520005/Sloane-Dining-Bench-Grey-Oak-Det_1-1678699067.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1678699069/crusader/variants/50520005/Sloane-Dining-Bench-Grey-Oak-Det_4-1678699067.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1678699345/crusader/variants/T50441109-LE4016/Sloane-Dining-Bench-Grey-Oak-Det_5-1678699343.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1677038062/crusader/variants/T50441109/Sloane-Dining-Bench-150cm-Grey-Oak-Dim-1677038060.png"
  ],
  "AS-000298-LE4016": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1679562782/crusader/variants/T504411010-LE4016/Sloane-Dining-Bench-180cm-Grey-Oak-With-Leather-Cushion-Angle-1679562780.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1679562782/crusader/variants/T504411010-LE4016/Sloane-Dining-Bench-180cm-Grey-Oak-With-Leather-Cushion-Front-1679562780.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1679562782/crusader/variants/T504411010-LE4016/Sloane-Dining-Bench-180cm-Grey-Oak-With-Leather-Cushion-Side-1679562780.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1679562782/crusader/variants/T504411010-LE4016/Sloane-Dining-Bench-180cm-Grey-Oak-Angle-1679562780.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1679562876/crusader/variants/T504411010-LE4016/Sloane-Dining-Bench-180cm-Grey-Oak-Side-1679562874.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1678698986/crusader/variants/50520005/Sloane-Dining-Bench-Square-Set_2-1678698984.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1678699006/crusader/variants/50520005/Sloane-Dining-Table-With-Dining-Bench-With-4-Cane-and-Leather-Chair-with-Armrest-Caramel-Black-Square-Set_3-1678699004.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1678699707/crusader/variants/T504411010-LE4016/Sloane-Dining-Bench-Square-Set_1-1678699705.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1678699069/crusader/variants/50520005/Sloane-Dining-Bench-Grey-Oak-Det_2-1678699067.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1678699069/crusader/variants/50520005/Sloane-Dining-Bench-Grey-Oak-Det_1-1678699067.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1678699069/crusader/variants/50520005/Sloane-Dining-Bench-Grey-Oak-Det_4-1678699067.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1678700026/crusader/variants/T504411010-LE4016/Sloane-Dining-Bench-Grey-Oak-Det_5-1678700023.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1677038062/crusader/variants/T50441109/Sloane-Dining-Bench-180cm-Grey-Oak-Dim-1677038060.png"
  ],
  "54000099-PT4001": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1684203750/crusader/variants/54000099-PT4001/Jonathan-Right-Chaise-Sofa-Creamy-White-Front-1684203748.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1684203750/crusader/variants/54000099-PT4001/Jonathan-Right-Chaise-Sofa-Creamy-White-Angle-1684203748.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1684203750/crusader/variants/54000099-PT4001/Jonathan-Right-Chaise-Sofa-Creamy-White-Side-1684203748.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1684203750/crusader/variants/54000099-PT4001/Jonathan-Right-Chaise-Sofa-Creamy-White-Back-1684203748.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1681976653/crusader/variants/54000099-PT4001/Jonathan-Extended-Side-Right-Chaise-Sofa-Creamy-White-Square-Det_2-1681976650.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1681976792/crusader/variants/54000099-PT4001/Jonathan-Side-Chaise-Sofa-Creamy-White-Square-Set_1-1681976789.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1681976824/crusader/variants/54000099-PT4001/Jonathan-Extended-Side-Right-Chaise-Sectional-Sofa-Creamy-White-Square-Set_4-1681976821.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1681976605/crusader/variants/54000099-PT4001/Jonathan-Side-Right-Chaise-Sofa-Creamy-White-Det_1-1681976602.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1683276890/crusader/variants/54000099-PT4001/Jonathan-Side-Right-Chaise-Sofa-Creamy-White-Det_2-1683276888.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1681976605/crusader/variants/54000099-PT4001/Jonathan-Side-Right-Chaise-Sofa-Creamy-White-Det_5-1681976602.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1681976606/crusader/variants/54000099-PT4001/Jonathan-Side-Right-Chaise-Sofa-Creamy-White-Det_6-1681976602.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1681977149/crusader/variants/T54000099/Jonathan-Right-Chaise-Sofa-Creamy-White-Dim-1681977147.png"
  ],
  "54000099-GI4001": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1681976035/crusader/variants/54000099-GI4001/Jonathan-Right-Chaise-Sofa-Zenith-Bule-Frone-1681976032.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1681976034/crusader/variants/54000099-GI4001/Jonathan-Right-Chaise-Sofa-Zenith-Bule-Angle-1681976032.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1681976035/crusader/variants/54000099-GI4001/Jonathan-Right-Chaise-Sofa-Zenith-Bule-Side-1681976032.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1681976035/crusader/variants/54000099-GI4001/Jonathan-Right-Chaise-Sofa-Zenith-Bule-Back-1681976032.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1683282433/crusader/variants/54000099-GI4001/Jonathan-Side-Right-Chaise-Sectional-Zenith-Bule-Det_12-1683282430.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1682058041/crusader/variants/54000099-GI4001/Jonathan-Side-Right-Chaise-Sofa-Zenith-Bule-Square-Set_1-1682058038.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1682058229/crusader/variants/54000099-GI4001/Jonathan-Extended-Side-Right-Chaise-Sectional-With-Ottoman-Zenith-Bule-Square-Set_1-1682058227.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1682058076/crusader/variants/54000099-GI4001/Jonathan-Extended-Side-Right-Chaise-Sectional-Zenith-Bule-Det_2-1682058073.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1682047531/crusader/variants/54000099-GI4001/Jonathan-Zenith-Blue-Det_1-1682047528.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1682047530/crusader/variants/54000099-GI4001/Jonathan-Sofa-Zenith-Blue-Det_7-1682047528.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1682047530/crusader/variants/54000099-GI4001/Jonathan-Zenith-Blue-Det_2-1682047528.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1681977130/crusader/variants/T54000099/Jonathan-Right-Chaise-Sofa-Zenith-Bule-Dim-1681977127.png"
  ],
  "54000099C-TL4003": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721015308/crusader/variants/54000094C-TL4003/Jonathan-3-Seater-Sofa-Charcoal-Grey-Front-1721015306.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1720667585/crusader/variants/50440775C-TL4003/Charcoal-Grey-Twill_Adams_Owen-1720667583.jpg"
  ],
  "54000099C-VL4014": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721015288/crusader/variants/54000094C-VL4014/Jonathan-3-Seater-Sofa-Olive-Gold-Front-1721015285.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1720577374/crusader/variants/AS-000190C-VL4014-SV/Owen-3-Seater-Sofa-Royal-Gold-Det6-1720577372.jpg"
  ],
  "54000099C-TL4001": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721015260/crusader/variants/54000094C-TL4001/Jonathan-3-Seater-Sofa-Indigo-Blue-Front-1721015257.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721015260/crusader/variants/54000094C-TL4001/Indigo-Blue-Twill_Owen-1721015257.jpg"
  ],
  "54000099C-CY4003": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721015239/crusader/variants/54000094C-CY4003/Jonathan-3-Seater-Sofa-Light-Blush-Front-1721015236.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721015239/crusader/variants/54000094C-CY4003/Lexi-Bed-Light-Blush-Square-Det_3-1721015236.jpg"
  ],
  "54000099C-CY4001": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721015218/crusader/variants/54000094C-CY4001/Jonathan-3-Seater-Sofa-Frost-White-Front-1721015216.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721015218/crusader/variants/54000094C-CY4001/Frost-White_1-1721015216.jpg"
  ],
  "54000099C-TL4002": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721015191/crusader/variants/54000094C-TL4002/Jonathan-3-Seater-Sofa-Pearl-Beige-Front-1721015189.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721015190/crusader/variants/54000094C-TL4002/Owen-3-Seater-Sofa-Pearl-Beige-Det6-1721015188.jpg"
  ],
  "54000099C-PM4002": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721015170/crusader/variants/54000094C-PM4002/Jonathan-3-Seater-Sofa-Performance-Brilliant-White-Front-1721015168.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1720679390/crusader/variants/54000103C-PM4002/Brilliant-White-PlainWeave_Adams_Owen-1720679387.jpg"
  ],
  "54000099C-CY4002": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721015149/crusader/variants/54000094C-CY4002/Jonathan-3-Seater-Sofa-Nickel-Grey-Front-1721015147.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1722479254/crusader/variants/54000094C-CY4002/Nickel-Grey-1722479251.jpg"
  ],
  "54000099C-PY4001": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721015128/crusader/variants/54000094C-PY4001/Jonathan-3-Seater-Sofa-Ivory-Front-1721015126.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1722308046/crusader/variants/AS-000189C-PY4001-GD/Ivory-Swatch-Copy_1-1722308043.jpg"
  ],
  "54000099C-PY4002": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721015105/crusader/variants/54000094C-PY4002/Jonathan-3-Seater-Sofa-Dove-Grey-Front-1721015102.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1722308132/crusader/variants/AS-000189C-PY4002-GD/Dove-Grey-Swatch-Copy_1-1722308130.jpg"
  ],
  "54000099C-PM4001": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1722419258/crusader/variants/54000094C-PM4001/Jonathan-3-Seater-Sofa-Performance-Smoke-Grey-Front__2_-1722419256.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1722419113/crusader/variants/54000094C-PM4001/Smoke-Grey-PlainWeave_Adams-1722419111.jpg"
  ],
  "54000099C-PY4003": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721015053/crusader/variants/54000094C-PY4003/Jonathan-3-Seater-Sofa-Moss-Front-1721015050.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1722308164/crusader/variants/AS-000189C-PY4003-BLK/Moss-Swatch-Copy_1-1722308161.jpg"
  ],
  "54000099C-PY4004": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721121746/crusader/variants/54000099C-PY4004/Jonathan-3-Seater-Sofa-Cumin-Front-1721121743.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1722307826/crusader/variants/AS-000189C-PY4004-BLK/Cumin-Swathc-Copy_1-1722307823.jpg"
  ],
  "54000099C-IN4003": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721014828/crusader/variants/54000094C-IN4003/Jonathan-3-Seater-Sofa-Ginger-Front-1721014825.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1720679762/crusader/variants/54000102C-IN4003/Marlow_Ginger-1720679759.jpg"
  ],
  "54000099C-IN4002": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721014807/crusader/variants/54000094C-IN4002/Jonathan-3-Seater-Sofa-White-Quartz-Front-1721014804.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1720679628/crusader/variants/54000102C-IN4002/White-Quartz_1-1720679625.jpg"
  ],
  "50440812-CB4001": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1683792587/crusader/variants/50440812-CB4001/Auburn-Performance-Boucle-Curve-Armless-Sofa-Chalk-Front-1683792584.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1683792587/crusader/variants/50440812-CB4001/Auburn-Performance-Boucle-Curve-Armless-Sofa-Chalk-Angle-1683792584.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1683792587/crusader/variants/50440812-CB4001/Auburn-Performance-Boucle-Curve-Armless-Sofa-Chalk-Side-1683792585.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1683792587/crusader/variants/50440812-CB4001/Auburn-Performance-Boucle-Curve-Armless-Sofa-Chalk-Back-1683792585.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1683793661/crusader/variants/50440812-CB4001/Auburn-Performance-Boucle-Armless-Curve-3-Seater-Sofa-Chalk-Square-Set_2-1683793659.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1683793662/crusader/variants/50440812-CB4001/Auburn-Performance-Boucle-Curve-3-Seater-Sofa-Chalk-Square-Set_5-1683793659.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1683793661/crusader/variants/50440812-CB4001/Auburn-Performance-Boucle-Curve-3-Seater-Sofa-Chalk-Square-Det_2-1683793659.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1683792607/crusader/variants/50440812-CB4001/Auburn-Performance-Boucle-Sofa-Chalk-Det_3-1683792604.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1683792607/crusader/variants/50440812-CB4001/Auburn-Performance-Boucle-Sofa-Chalk-Det_4-1683792604.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1684308503/crusader/variants/T50440812/Auburn-Performance-Boucle-Curve-Armless-Sofa-Chalk-Dim-1684308493.png"
  ],
  "50440812-AR4002": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692455594/crusader/variants/50440812-AR4002/Auburn-Performance-Boucle-Curve-Armless-Sofa-Basalt-Front-1692455592.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692455592/crusader/variants/50440812-AR4002/Auburn-Performance-Boucle-Curve-Armless-Sofa-Basalt-Angle-1692455590.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692455594/crusader/variants/50440812-AR4002/Auburn-Performance-Boucle-Curve-Armless-Sofa-Basalt-Side-1692455592.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692455594/crusader/variants/50440812-AR4002/Auburn-Performance-Boucle-Curve-Armless-Sofa-Basalt-Back-1692455592.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1693993520/crusader/variants/50440812-AR4002/Auburn-Performance-Boucle-Armless-Curve-3-Seater-Sofa-Basalt-Square-Set_4-1693993520.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1693993514/crusader/variants/50440812-AR4002/Auburn-Performance-Boucle-Curve-L-Shape-Sectional-Sofa-Basalt-Set_1-1693993514.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1693993504/crusader/variants/50440812-AR4002/Auburn-Performance-Boucle-Armless-Curve-3-Seater-Sofa-Basalt-Square-Det_2-1693993504.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692443227/crusader/variants/50440808-AR4002/Auburn-Performance-Boucle-Sofa-Basalt-Square-Det_3-1692443225.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692442156/crusader/variants/50440808-AR4002/Auburn-Performance-Boucle-Sofa-Basalt-Square-Det_2-1692442154.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692614526/crusader/variants/T50440812/Auburn-Performance-Boucle-Curve-Armless-Sofa-Basalt-Dim-1692614523.png"
  ],
  "AS-000309-CB4001": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1683795327/crusader/variants/50441135-CB4001/Auburn-Performance-Boucle-Extended-L-Shape-Sectional-Sofa-Chalk-Front-1683795325.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1683795327/crusader/variants/50441135-CB4001/Auburn-Performance-Boucle-Extended-L-Shape-Sectional-Sofa-Chalk-Side-1683795325.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1683795327/crusader/variants/50441135-CB4001/Auburn-Performance-Boucle-Extended-L-Shape-Sectional-Sofa-Chalk-Back-1683795325.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1683796668/crusader/variants/50441135-CB4001/Auburn-Performance-Boucle-Extended-L-Shape-Sectional-Sofa-Chalk-Square-Set_5-1683796666.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1683796668/crusader/variants/50441135-CB4001/Auburn-Performance-Boucle-Extended-L-Shape-Sectional-Sofa-Chalk-Square-Set_4-1683796666.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1684309216/crusader/variants/T50441135-CB4001/Auburn-Performance-Boucle-Curve-3-Seater-Sofa-Chalk-Square-Det_2-1684309213.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1683795373/crusader/variants/50441135-CB4001/Auburn-Performance-Boucle-Extended-3-Seater-Sofa-Chalk_-Det_1-1683795370.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1683795371/crusader/variants/50441135-CB4001/Auburn-Performance-Boucle-Sofa-Chalk-Det_3-1683795368.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1683795373/crusader/variants/50441135-CB4001/Auburn-Performance-Boucle-Sofa-Chalk-Det_4-1683795371.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1685332835/crusader/variants/T50441135/Auburn-Performance-Boucle-Extended-L-Shape-Sectional-Sofa-Chalk-Dim-1685332833.png"
  ],
  "AS-000309-AR4002": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692457458/crusader/variants/AS-000309-AR4002/Auburn-Performance-Boucle-Extended-L-Shape-Sectional-Sofa-Basalt-Front-1692457455.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692457457/crusader/variants/AS-000309-AR4002/Auburn-Performance-Boucle-Extended-L-Shape-Sectional-Sofa-Basalt-Side-1692457454.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692457462/crusader/variants/AS-000309-AR4002/Auburn-Performance-Boucle-Extended-L-Shape-Sectional-Sofa-Basalt-Back-1692457460.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1693994465/crusader/variants/AS-000309-AR4002/Auburn-Performance-Boucle-Extended-L-Shape-Sectional-Sofa-Basalt-Square-Set_5-1693994465.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1693994465/crusader/variants/AS-000309-AR4002/Auburn-Performance-Boucle-Extended-L-Shape-Sectional-Sofa-Basalt-Set_2-1693994465.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1693994538/crusader/variants/AS-000309-AR4002/Auburn-Performance-Boucle-L-Shape-Sectional-Sofa-Basalt-Square-Det_1-1693994538.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692443229/crusader/variants/50440808-AR4002/Auburn-Performance-Boucle-3-Seater-Sofa-Basalt-Square-Det_5-1692443226.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692443227/crusader/variants/50440808-AR4002/Auburn-Performance-Boucle-Sofa-Basalt-Square-Det_3-1692443225.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692442156/crusader/variants/50440808-AR4002/Auburn-Performance-Boucle-Sofa-Basalt-Square-Det_2-1692442154.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692615501/crusader/variants/TAS-000309/Auburn-Performance-Boucle-Extended-L-Shape-Sectional-Sofa-Basalt-Dim-1692615498.png"
  ],
  "AS-000312-WA": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1677489516/crusader/variants/T50441118/Emmerson-Adjustable-Standing-Desk-Angle-120cm_1-1677489514.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1677489611/crusader/variants/T50441118/Emmerson-Adjustable-Standing-Desk-Det_1-1677489605.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1677489516/crusader/variants/T50441118/Emmerson-Adjustable-Standing-Desk-Front-120cm_1-1677489514.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1677489516/crusader/variants/T50441118/Emmerson-Adjustable-Standing-Desk-Side-120cm_2-1677489514.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1677489516/crusader/variants/T50441118/Emmerson-Adjustable-Standing-Desk-Back-120cm_1-1677489514.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1678353385/crusader/variants/T50441118/Emmerson-Adjustable-Standing-Desk-Walnut-3-Stage-Leg-Square-Set_4-1678353382.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1678353470/crusader/variants/T50441119/Emmerson-Adjustable-Standing-Desk-Walnut-3-Stage-Leg-Square-Set_1-1678353468.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1678353791/crusader/variants/T50441119/Emmerson-Adjustable-Standing-Desk-Walnut-3-Stage-Leg-Square-Det_2-1678353789.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1679372098/crusader/variants/T50441119/Emmerson-Adjustable-Standing-Desk-Copy-1679372093.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1679384250/crusader/variants/T50441119/Emmerson-Adjustable-Standing-Desk-Square-Det_2-1679384248.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1677489656/crusader/variants/T50441118/Emmerson-Adjustable-Standing-Desk-Square-Det_4-1677489653.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1677489865/crusader/variants/T50441117/Emmerson-Adjustable-Standing-Desk-120cm-Dim-1677489863.png"
  ],
  "AS-000998-OA": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1768879769/crusader/variants/AS-000998-OA/Emmerson-Adjustable-Desk-120cm-Oak-Angle-1768879767.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1756433203/crusader/variants/AS-000998-OA/Emmerson-Adjustable-Desk-120cm-Oak-Front-1756433201.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1768987733/crusader/variants/AS-000998-OA/Emmerson-Adjustable-Desk-120cm-Oak-Side-1768987731.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1645082319/crusader/variants/T50441014/Emmerson-Adjustable-Standing-Desk-Oak-Square-Set_6.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1645082359/crusader/variants/T50441014/Emmerson-Adjustable-Standing-Desk-Oak-Square-Set_2.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1645082359/crusader/variants/T50441014/Emmerson-Adjustable-Standing-Desk-Oak-Square-Set_5.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1756432902/crusader/variants/AS-000997-OA/Emmerson-Adjustable-Desk-120cm-Oak-Usp-Det_2-1756432900.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1756432903/crusader/variants/AS-000997-OA/Emmerson-Adjustable-Desk-120cm-Oak-Usp-Det_3-1756432900.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1756432902/crusader/variants/AS-000997-OA/Emmerson-Adjustable-Desk-120cm-Oak-Usp-Det_1-1756432900.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1645082403/crusader/variants/T50441014/Emmerson-Adjustable-Standing-Desk-Oak-Square-Det_6.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1756872046/crusader/variants/TAS-000312/Emmerson-Adjustable-Desk-120cm-Oak-Dim-1756872044.png"
  ],
  "AS-000997-OA": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1768879809/crusader/variants/AS-000997-OA/Emmerson-Adjustable-Desk-140cm-Oak-Angle-1768879807.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1756432861/crusader/variants/AS-000997-OA/Emmerson-Adjustable-Desk-140cm-Oak-Front-1756432859.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1768987782/crusader/variants/AS-000997-OA/Emmerson-Adjustable-Desk-140cm-Oak-Side-1768987780.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1645082319/crusader/variants/T50441014/Emmerson-Adjustable-Standing-Desk-Oak-Square-Set_6.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1645082359/crusader/variants/T50441014/Emmerson-Adjustable-Standing-Desk-Oak-Square-Set_2.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1645082359/crusader/variants/T50441014/Emmerson-Adjustable-Standing-Desk-Oak-Square-Set_5.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1756432902/crusader/variants/AS-000997-OA/Emmerson-Adjustable-Desk-120cm-Oak-Usp-Det_2-1756432900.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1756432903/crusader/variants/AS-000997-OA/Emmerson-Adjustable-Desk-120cm-Oak-Usp-Det_3-1756432900.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1756432902/crusader/variants/AS-000997-OA/Emmerson-Adjustable-Desk-120cm-Oak-Usp-Det_1-1756432900.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1645082403/crusader/variants/T50441014/Emmerson-Adjustable-Standing-Desk-Oak-Square-Det_6.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1756872046/crusader/variants/TAS-000312/Emmerson-Adjustable-Desk-140cm-Oak-Dim-1756872044.png"
  ],
  "50441113-F00901": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1762965327/crusader/variants/50441113-F00901/Tilly-Throw-Cushion-30x50cm-Ash-Front-1762965324.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1762965327/crusader/variants/50441113-F00901/Tilly-Throw-Cushion-30x50cm-Ash-Back-1762965324.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1762965327/crusader/variants/50441113-F00901/Tilly-Cushion-50x50cm-Collection-Square-Set_1_-1762965325.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1762965327/crusader/variants/50441113-F00901/Tilly-Throw-Cushion-50x50cm-Ash-Det_3-1762965325.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1762965327/crusader/variants/50441113-F00901/Tilly-Throw-Cushion-50x50cm-Ash-Det_1-1762965325.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1762964963/crusader/variants/T50441112-TI/Tilly-Throw-Cushion-30x50cm-Ash-Dim-1762964961.png"
  ],
  "50441113-F00902": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1762965411/crusader/variants/50441113-F00902/Tilly-Throw-Cushion-30x50cm-Ecru-Front-1762965409.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1762965411/crusader/variants/50441113-F00902/Tilly-Throw-Cushion-30x50cm-Ecru-Back-1762965409.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1762965411/crusader/variants/50441113-F00902/Tilly-Cushion-50x50cm-Collection-Square-Set_1_-1762965409.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1762965411/crusader/variants/50441113-F00902/Tilly-Throw-Cushion-50x50cm-Ecru-Det_1-1762965409.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1762965411/crusader/variants/50441113-F00902/Tilly-Throw-Cushion-50x50cm-Ecru-Det_3-1762965409.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1762964963/crusader/variants/T50441112-TI/Tilly-Throw-Cushion-30x50cm-Ecru-Dim-1762964961.png"
  ],
  "50441112-F00901": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1762965279/crusader/variants/50441112-F00901/Tilly-Throw-Cushion-50x50cm-Ash--Front-1762965276.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1762965279/crusader/variants/50441112-F00901/Tilly-Throw-Cushion-50x50cm-Ash-Back-1762965276.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1762965290/crusader/variants/50441112-F00901/Tilly-Cushion-50x50cm-Collection-Square-Set_1_-1762965287.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1762965278/crusader/variants/50441112-F00901/Tilly-Throw-Cushion-50x50cm-Ash-Det_3-1762965276.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1762965278/crusader/variants/50441112-F00901/Tilly-Throw-Cushion-50x50cm-Ash-Det_1-1762965276.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1762964963/crusader/variants/T50441112-TI/Tilly-Throw-Cushion-50x50cm-Ash-Dim-1762964961.png"
  ],
  "50441112-F00902": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1762965381/crusader/variants/50441112-F00902/Tilly-Throw-Cushion-50x50cm-Ecru-Front-1762965378.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1762965380/crusader/variants/50441112-F00902/Tilly-Throw-Cushion-50x50cm-Ecru-Back-1762965378.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1762965381/crusader/variants/50441112-F00902/Tilly-Cushion-50x50cm-Collection-Square-Set_1_-1762965378.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1762965380/crusader/variants/50441112-F00902/Tilly-Throw-Cushion-50x50cm-Ecru-Det_1-1762965378.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1762965380/crusader/variants/50441112-F00902/Tilly-Throw-Cushion-50x50cm-Ecru-Det_3-1762965378.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1762964964/crusader/variants/T50441112-TI/Tilly-Throw-Cushion-50x50cm-Ecru-Dim-1762964961.png"
  ],
  "50441112-F00903": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1762965203/crusader/variants/50441112-F00903/Tilly-Throw-Cushion-50x50cm-Oyster-Front__1_-1762965201.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1762965203/crusader/variants/50441112-F00903/Tilly-Throw-Cushion-50x50cm-Oyster-Back-1762965201.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1762965203/crusader/variants/50441112-F00903/Tilly-Cushion-50x50cm-Collection-Square-Set_1_-1762965201.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1762965203/crusader/variants/50441112-F00903/Tilly-Throw-Cushion-50x50cm-Oyster-Det_1-1762965201.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1762965203/crusader/variants/50441112-F00903/Tilly-Throw-Cushion-50x50cm-Oyster-Det_3-1762965201.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1762964963/crusader/variants/T50441112-TI/Tilly-Throw-Cushion-50x50cm-Oyster-Dim-1762964961.png"
  ],
  "54000098-LE4016": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692352560/crusader/variants/54000098-LE4016/Jonathan-Leather-Side-Left-Chaise_-Caramel-Front-1692352558.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692352561/crusader/variants/54000098-LE4016/Jonathan-Leather-Side-Left-Chaise_-Caramel-Angle-1692352558.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692352561/crusader/variants/54000098-LE4016/Jonathan-Leather-Side-Left-Chaise_-Caramel-Side-1692352558.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692352561/crusader/variants/54000098-LE4016/Jonathan-Leather-Side-Left-Chaise_-Caramel-Back-1692352558.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691552382/crusader/variants/54000098-LE4016/Jonathan-Leather-Left-Chaise-Sofa-Square-Set_2-1691552380.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691552383/crusader/variants/54000098-LE4016/Jonathan-Leather-Side-Left-Chaise-Sofa-Square-Set_2-1691552380.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691552382/crusader/variants/54000098-LE4016/Jonathan-Leather-Extended-Side-Left-Chaise-Sectional-Caramel-Square-Set_5-1691552380.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691552431/crusader/variants/54000098-LE4016/Jonathan-Sofa-Leather-Caramel-Det_7-1691552428.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691552431/crusader/variants/54000098-LE4016/Jonathan-Sofa-Leather-Caramel-Det_2-1691552429.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691552255/crusader/variants/54000098-LE4016/Jonathan-Texture-1691552252.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692352585/crusader/variants/T54000098-LE/Jonathan-Leather-Side-Left-Chaise_-Caramel-Dim-1692352582.png"
  ],
  "54000098-LE4017": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1689071588/crusader/variants/54000098-LE4017/Jonathan-Leather-Side-Left-Chaise_-Warm-Taupe-Front-1689071586.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1689071588/crusader/variants/54000098-LE4017/Jonathan-Leather-Side-Left-Chaise_-Warm-Taupe-Angle-1689071586.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1689071588/crusader/variants/54000098-LE4017/Jonathan-Leather-Side-Left-Chaise_-Warm-Taupe-Side-1689071586.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1689071588/crusader/variants/54000098-LE4017/Jonathan-Leather-Side-Left-Chaise_-Warm-Taupe-Back-1689071586.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691552620/crusader/variants/54000098-LE4017/Jonathan-Leather-Side-Left-Chaise_-Sofa-Taupe-Square-Set_1-1691552617.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691552620/crusader/variants/54000098-LE4017/Jonathan-Leather-Side-Left-Chaise-Sofa_-Taupe-Square-Set_3-1691552617.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691741959/crusader/variants/54000098-LE4017/Jonathan-Leather-Extended-Side-Left-Chaise-Sectional-Sofa-Taupe-Square-Set_4-1691741957.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691553076/crusader/variants/54000098-LE4017/Jonathan-Extended-3-Seater-Sofa-Taupe-Det_3-1691553074.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691553076/crusader/variants/54000098-LE4017/Jonathan-Sofa-Leather-Taupe-Det_10-1691553074.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691552508/crusader/variants/54000098-LE4017/Jonathan-Taupe-Texture-1691552505.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1689071735/crusader/variants/T54000098-LE/Jonathan-Leather-Side-Left-Chaise_-Warm-Taupe-Dim-1689071733.png"
  ],
  "54000099-LE4016": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692352622/crusader/variants/54000099-LE4016/Jonathan-Leather-Side-Right-Chaise_-Caramel-Front-1692352619.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691553230/crusader/variants/54000099-LE4016/Jonathan-Leather-Right-Chaise-Sofa-Square-Set_2-1691553227.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691553230/crusader/variants/54000099-LE4016/Jonathan-Leather-Side-Right-Chaise-Sofa-Square-Set_2-1691553227.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691553276/crusader/variants/54000099-LE4016/Jonathan-Leather-Extended-Side-Right-Chaise-Sectional-Caramel-Square-Set_5-1691553273.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691553318/crusader/variants/54000099-LE4016/Jonathan-Sofa-Leather-Caramel-Det_7-1691553315.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691553317/crusader/variants/54000099-LE4016/Jonathan-Sofa-Leather-Caramel-Det_2-1691553315.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691553334/crusader/variants/54000099-LE4016/Jonathan-Texture-1691553331.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692352621/crusader/variants/54000099-LE4016/Jonathan-Leather-Side-Right-Chaise_-Caramel-Angle-1692352619.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692352621/crusader/variants/54000099-LE4016/Jonathan-Leather-Side-Right-Chaise_-Caramel-Side-1692352619.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692352622/crusader/variants/54000099-LE4016/Jonathan-Leather-Side-Right-Chaise_-Caramel-Back-1692352619.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692352649/crusader/variants/T54000099-LE/Jonathan-Leather-Side-Right-Chaise_-Caramel-Dim-1692352647.png"
  ],
  "54000099-LE4017": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1689071794/crusader/variants/54000099-LE4017/Jonathan-Leather-Side-Right-Chaise-Warm-Taupe-Front-1689071791.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1689071793/crusader/variants/54000099-LE4017/Jonathan-Leather-Side-Right-Chaise-Warm-Taupe-Angle-1689071791.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1689071794/crusader/variants/54000099-LE4017/Jonathan-Leather-Side-Right-Chaise--Warm-Taupe-Side-1689071791.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1689071793/crusader/variants/54000099-LE4017/Jonathan-Leather-Side-Right-Chaise-Warm-Taupe-Back-1689071791.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691741870/crusader/variants/54000099-LE4017/Jonathan-Leather-Side-Right-Chaise_-Sofa-Taupe-Square-Set_1-1691741867.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691553491/crusader/variants/54000099-LE4017/Jonathan-Leather-Side-Right-Chaise-Sofa_-Taupe-Square-Set_3-1691553488.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691741925/crusader/variants/54000099-LE4017/Jonathan-Leather-Extended-Side-Right-Chaise-Sectional-Sofa-Taupe-Square-Set_4-1691741923.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691553491/crusader/variants/54000099-LE4017/Jonathan-Leather-Side-Right-Chaise-Sectional-Sofa-Taupe-Det_1-1691553488.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691553360/crusader/variants/54000099-LE4017/Jonathan-Taupe-Texture-1691553358.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1689071970/crusader/variants/T54000099-LE/Jonathan-Leather-Side-Right-Chaise-Warm-Taupe-Dim-1689071968.png"
  ],
  "54000149-WW": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1696935038/crusader/variants/54000149-WW/Austen-Dining-Chair-White-Wash-Angle-1696935036.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1696935038/crusader/variants/54000149-WW/Austen-Dining-Chair-White-Wash-Front-1696935036.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1696935038/crusader/variants/54000149-WW/Austen-Dining-Chair-White-Wash-Side-1696935036.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1696935038/crusader/variants/54000149-WW/Austen-Dining-Chair-White-Wash-Back-1696935036.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1700453305/crusader/variants/54000149-WW/Austen-Dining-Arm-Chair-White-Wash-Square-Set_4-1700453303.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1700453306/crusader/variants/54000149-WW/Austen-Dining-Arm-Chair-White-Wash-Square-Set_1-1700453303.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1700453306/crusader/variants/54000149-WW/Austen-Dining-Arm-Chair-White-Wash-Square-Set_3-1700453303.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1700453464/crusader/variants/54000149-WW/Austen-Dining-Arm-Chair-White-Wash-Square-Det_3-1700453461.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1700453130/crusader/variants/54000149-WW/Austen-Dining-Arm-Chair-Walnut-With-Arm-Dining-Chair-White-Square-Set_1-1700453127.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1696935102/crusader/variants/54000149-WW/Austen-Dining-Arm-Chair-White-Wash-Square-Det_1-1696935100.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1696935182/crusader/variants/54000149-WW/Austen-Dining-Arm-Chair-White-Wash-Square-Det_4-1696935180.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1696935415/crusader/variants/T54000149/Austen-Dining-Chair-White-Wash-Dim-1696935413.png"
  ],
  "AS-000386-LE4016": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692353534/crusader/variants/AS-000386-LE4016/Jonathan-Leather-Extended-Side-Left-Chaise-Sofa-_Caramel-Front-1692353532.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692353535/crusader/variants/AS-000386-LE4016/Jonathan-Leather-Extended-Side-Left-Chaise-Sofa-_Caramel-Angle-1692353532.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692353534/crusader/variants/AS-000386-LE4016/Jonathan-Leather-Extended-Side-Left-Chaise-Sofa-_Caramel-Side-1692353532.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692353535/crusader/variants/AS-000386-LE4016/Jonathan-Leather-Extended-Side-Left-Chaise-Sofa-_Caramel-Back-1692353532.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691568226/crusader/variants/AS-000386-LE4016/Jonathan-Leather-Extended-Side-Left-Chaise-Sofa-With-Ottoman-Caramel-Square-Set_2-1691568224.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691568227/crusader/variants/AS-000386-LE4016/Jonathan-Leather-Extended-Side-Left-Chaise-Sofa-With-Ottoman-Caramel-Square-Set_4-1691568224.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691568227/crusader/variants/AS-000386-LE4016/Jonathan-Leather-Left-Chaise-Sofa-Caramel-Square-Det_1-1691568224.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691568226/crusader/variants/AS-000386-LE4016/Jonathan-Leather-Side-Left-Chaise-Sectional-Caramel-Square-Det_1-1691568224.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691568125/crusader/variants/AS-000386-LE4016/Jonathan-Sofa-Leather-Caramel-Det_7-1691568122.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691568109/crusader/variants/AS-000386-LE4016/Jonathan-Sofa-Leather-Caramel-Det_2__1_-1691568107.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691568095/crusader/variants/AS-000386-LE4016/Jonathan-Texture-1691568093.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692353656/crusader/variants/TAS-000386/Jonathan-Leather-Extended-Side-Left-Chaise-Sofa-_Caramel-Dim-1692353654.png"
  ],
  "AS-000387-LE4016": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692353607/crusader/variants/AS-000387-LE4016/Jonathan-Leather-Extended-Side-Right-Chaise-Sofa-_Caramel-Front-1692353605.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692353607/crusader/variants/AS-000387-LE4016/Jonathan-Leather-Extended-Side-Right-Chaise-Sofa-_Caramel-Angle-1692353605.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692353607/crusader/variants/AS-000387-LE4016/Jonathan-Leather-Extended-Side-Right-Chaise-Sofa-_Caramel-Side-1692353605.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692353608/crusader/variants/AS-000387-LE4016/Jonathan-Leather-Extended-Side-Right-Chaise-Sofa-_Caramel-Back-1692353605.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691568318/crusader/variants/AS-000387-LE4016/Jonathan-Leather-Extended-Side-Right-Chaise-Sofa-With-Ottoman-Caramel-Square-Set_2-1691568316.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691568318/crusader/variants/AS-000387-LE4016/Jonathan-Leather-Extended-Side-Right-Chaise-Sofa-With-Ottoman-Caramel-Square-Set_4-1691568316.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691568319/crusader/variants/AS-000387-LE4016/Jonathan-Leather-Right-Chaise-Sofa-Caramel-Square-Det_1-1691568316.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691568319/crusader/variants/AS-000387-LE4016/Jonathan-Leather-Side-Right-Chaise-Sectional-Caramel-Square-Det_1-1691568316.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691568345/crusader/variants/AS-000387-LE4016/Jonathan-Sofa-Leather-Caramel-Det_7-1691568343.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691568345/crusader/variants/AS-000387-LE4016/Jonathan-Sofa-Leather-Caramel-Det_2__1_-1691568343.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691568359/crusader/variants/AS-000387-LE4016/Jonathan-Texture-1691568356.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692353656/crusader/variants/TAS-000386/Jonathan-Leather-Extended-Side-Right-Chaise-Sofa-_Caramel-Dim-1692353654.png"
  ],
  "AS-000386-LE4017": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691568671/crusader/variants/AS-000386-LE4017/Jonathan-Leather-Extended-Side-Left-Chaise-Sofa-Warm-Taupe-Front-1691568668.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691568670/crusader/variants/AS-000386-LE4017/Jonathan-Leather-Extended-Side-Left-Chaise-Sofa-_Warm-Taupe-Side-1691568668.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691568671/crusader/variants/AS-000386-LE4017/Jonathan-Leather-Extended-Side-Left-Chaise-Sofa-_Warm-Taupe-Angle-1691568668.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691568670/crusader/variants/AS-000386-LE4017/Jonathan-Leather-Extended-Side-Left-Chaise-Sofa-_Warm-Taupe-Back-1691568668.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691568742/crusader/variants/AS-000386-LE4017/Jonathan-Leather-Extended-Side-Left-Chaise-Sofa-_Taupe-Square-Set_2-1691568739.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691568742/crusader/variants/AS-000386-LE4017/Jonathan-Leather-Extended-Side-Left-Chaise-Sofa-_Taupe-Square-Set_5-1691568739.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691568742/crusader/variants/AS-000386-LE4017/Jonathan-Leather-L-Shape-Sectional-Sofa-Taupe-Det_1-1691568739.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691568742/crusader/variants/AS-000386-LE4017/Jonathan-Leather-Side-Left-Chaise-Sectional-Sofa-Taupe-Det_1-1691568739.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691568632/crusader/variants/AS-000386-LE4017/Jonathan-Extended-3-Seater-Sofa-Taupe-Det_3-1691568630.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691568632/crusader/variants/AS-000386-LE4017/Jonathan-Sofa-Leather-Taupe-Det_10__1_-1691568630.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691568407/crusader/variants/AS-000386-LE4017/Jonathan-Taupe-Texture-1691568404.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691569440/crusader/variants/TAS-000386/Jonathan-Leather-Extended-Side-Left-Chaise-Sofa-Warm-Taupe-Dim-1691569438.png"
  ],
  "AS-000387-LE4017": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691569209/crusader/variants/AS-000387-LE4017/Jonathan-Leather-Extended-Side-Right-Chaise-Sofa-Warm-Taupe-Front-1691569207.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691569209/crusader/variants/AS-000387-LE4017/Jonathan-Leather-Extended-Side-Right-Chaise-Sofa-_Warm-Taupe-Angle-1691569207.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691569209/crusader/variants/AS-000387-LE4017/Jonathan-Leather-Extended-Side-Right-Chaise-Sofa-_Warm-Taupe-Side-1691569207.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691569209/crusader/variants/AS-000387-LE4017/Jonathan-Leather-Extended-Side-Right-Chaise-Sofa-_Warm-Taupe-Back-1691569207.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691568933/crusader/variants/AS-000387-LE4017/Jonathan-Leather-Extended-Side-Right-Chaise-Sofa-_Taupe-Square-Set_2-1691568931.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691568933/crusader/variants/AS-000387-LE4017/Jonathan-Leather-Extended-Side-Right-Chaise-Sofa-_Taupe-Square-Set_5-1691568931.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691569098/crusader/variants/AS-000387-LE4017/Jonathan-Leather-L-Shape-Sectional-Sofa-Taupe-Det_1-1691569095.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691568933/crusader/variants/AS-000387-LE4017/Jonathan-Leather-Side-Right-Chaise-Sectional-Sofa-Taupe-Det_1-1691568931.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691569136/crusader/variants/AS-000387-LE4017/Jonathan-Extended-3-Seater-Sofa-Taupe-Det_3-1691569134.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691569136/crusader/variants/AS-000387-LE4017/Jonathan-Sofa-Leather-Taupe-Det_10__1_-1691569133.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691569116/crusader/variants/AS-000387-LE4017/Jonathan-Taupe-Texture-1691569114.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691569441/crusader/variants/TAS-000386/Jonathan-Leather-Extended-Side-Right-Chaise-Sofa-Warm-Taupe-Dim-1691569438.png"
  ],
  "50440764-PM4002": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1634798906/crusader/variants/50440764-MC4002/Hamilton-3-Seater-Sofa-Brilliant-White-Front-SG.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1634798906/crusader/variants/50440764-MC4002/Hamilton-3-Seater-Sofa-Brilliant-White-Angle-SG.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1634798906/crusader/variants/50440764-MC4002/Hamilton-3-Seater-Sofa-Brilliant-White-Side-SG.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1634798907/crusader/variants/50440764-MC4002/Hamilton-3-Seater-Sofa-Brilliant-White-Back-SG.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1635412853/crusader/variants/50440764-MC4002/Hamilton-3-Seater-Sofa-Brilliant-White-Square-Set_4.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1634799049/crusader/variants/50440764-MC4002/Hamilton-3-Seater-Sofa-Brilliant-White-Square-Set_1.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1635412852/crusader/variants/50440764-MC4002/Hamilton-3-Seater-Sofa-Brilliant-White-Square-Set_3.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1717398937/crusader/variants/50440764-MC4001/Owen-Sofa-Headrest-Opal-Beige-Square-Det_10-1717398935.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1672979178/crusader/variants/50440764-MC4002/Hamilton-Sectional-Sofa-Brilliant-White-Square-Det_6-1672979175.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1695289807/crusader/variants/T50440764/Hamilton-3-Seater-Sofa-Brilliant-White-Dim-SG-1695289804.png"
  ],
  "50441025-PM4002": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1634798906/crusader/variants/50440764-MC4002/Hamilton-3-Seater-Sofa-Brilliant-White-Front-SG.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1634798906/crusader/variants/50440764-MC4002/Hamilton-3-Seater-Sofa-Brilliant-White-Angle-SG.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1634798906/crusader/variants/50440764-MC4002/Hamilton-3-Seater-Sofa-Brilliant-White-Side-SG.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1634798907/crusader/variants/50440764-MC4002/Hamilton-3-Seater-Sofa-Brilliant-White-Back-SG.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1635412853/crusader/variants/50440764-MC4002/Hamilton-3-Seater-Sofa-Brilliant-White-Square-Set_4.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1634799049/crusader/variants/50440764-MC4002/Hamilton-3-Seater-Sofa-Brilliant-White-Square-Set_1.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1635412852/crusader/variants/50440764-MC4002/Hamilton-3-Seater-Sofa-Brilliant-White-Square-Set_3.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1716792107/crusader/variants/50440763-MC4001/Owen-Sofa-Headrest-Opal-Beige-Square-Det_10-1716792107.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1672979178/crusader/variants/50440764-MC4002/Hamilton-Sectional-Sofa-Brilliant-White-Square-Det_6-1672979175.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1753686418/crusader/variants/T50440764/Hamilton-3-Seater-Sofa-Brilliant-White-Dim-SG-1753686416.png"
  ],
  "50441025-PM4001": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1634798684/crusader/variants/50440764-MC4001/Hamilton-3-Seater-Sofa-Smoke-Grey-Front-SG.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1634798684/crusader/variants/50440764-MC4001/Hamilton-3-Seater-Sofa-Smoke-Grey-Angle-SG.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1634798670/crusader/variants/50440764-MC4001/Hamilton-3-Seater-Sofa-Smoke-Grey-Side-SG.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1634798684/crusader/variants/50440764-MC4001/Hamilton-3-Seater-Sofa-Smoke-Grey-Back-SG.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1635413055/crusader/variants/50440764-MC4001/Hamilton-3-Seater-Sofa-Somke-Grey-Square-Set_3.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1634799118/crusader/variants/50440764-MC4001/Hamilton-3-Seater-Sofa-Smoke-Grey-Lifestyle-Crop.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1635413053/crusader/variants/50440764-MC4001/Hamilton-3-Seater-Sofa-Somke-Grey-Square-Set_4.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1716792107/crusader/variants/50440763-MC4001/Owen-Sofa-Headrest-Opal-Beige-Square-Det_10-1716792107.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1672989511/crusader/variants/50440764-MC4001/Hamilton-Round-Chaise-Sectional-Sofa-in-Smoke-Grey-Square-Det_7-1672989508.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1753686418/crusader/variants/T50440764/Hamilton-3-Seater-Sofa-Smoke-Grey-Dim-SG-1753686416.png"
  ],
  "50441025C-IN4002": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1730886058/crusader/variants/50440764C-IN4002/Hamilton-3-Seater-Sofa-White-Quartz-Front-1730886055.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1720679628/crusader/variants/54000102C-IN4002/White-Quartz_1-1720679625.jpg"
  ],
  "50441025C-PT4001": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1730886138/crusader/variants/50440764C-PT4001/Hamilton-3-Seater-Sofa-Creamy-White-Front-1730886135.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1720679601/crusader/variants/54000102C-PT4001/Creamy-White-Twill_Adams_Owen-1720679599.jpg"
  ],
  "50441025C-IN4003": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1730886089/crusader/variants/50440764C-IN4003/Hamilton-3-Seater-Sofa-Ginger-Front-1730886086.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1720679762/crusader/variants/54000102C-IN4003/Marlow_Ginger-1720679759.jpg"
  ],
  "50441025C-PY4001": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1730886210/crusader/variants/50440764C-PY4001/Hamilton-3-Seater-Sofa-Ivory-Front-1730886207.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1722308046/crusader/variants/AS-000189C-PY4001-GD/Ivory-Swatch-Copy_1-1722308043.jpg"
  ],
  "50441025C-PY4002": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1730886184/crusader/variants/50440764C-PY4002/Hamilton-3-Seater-Sofa-Dove-Grey-Front-1730886181.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1722308132/crusader/variants/AS-000189C-PY4002-GD/Dove-Grey-Swatch-Copy_1-1722308130.jpg"
  ],
  "50441025C-PY4004": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1730886113/crusader/variants/50440764C-PY4004/Hamilton-3-Seater-Sofa-Cumin-Front-1730886111.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1722307826/crusader/variants/AS-000189C-PY4004-BLK/Cumin-Swathc-Copy_1-1722307823.jpg"
  ],
  "50441025C-PY4003": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1730886158/crusader/variants/50440764C-PY4003/Hamilton-3-Seater-Sofa-Moss-Front-1730886155.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1722308164/crusader/variants/AS-000189C-PY4003-BLK/Moss-Swatch-Copy_1-1722308161.jpg"
  ],
  "AS-000859-PG4001-NA": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691395506/crusader/variants/AS-000403-PG4001/Mori-Right-Facing-Chaise-Sofa-Alpine-Front-1691395504.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691395506/crusader/variants/AS-000403-PG4001/Mori-Right-Facing-Chaise-Sofa-Alpine-Angle-1691395504.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691395506/crusader/variants/AS-000403-PG4001/Mori-Right-Facing-Chaise-Sofa-Alpine-Side-1691395504.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691395506/crusader/variants/AS-000403-PG4001/Mori-Right-Facing-Chaise-Sofa-Alpine-Back-1691395504.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692004617/crusader/variants/AS-000403-PG4001/Mori-Right-Facing-Chaise-Sectional-Sofa-Square-Set_5-1692004615.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692003381/crusader/variants/AS-000403-PG4001/Mori-Right-Facing-Chaise-Sectional-Sofa-With-Attachable-Ottoman-Square-Set_1-1692003378.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692003381/crusader/variants/AS-000403-PG4001/Mori-Right-Facing-Chaise-Sectional-Sofa-Square-Set_4-1692003378.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1716799505/crusader/variants/AS-000403-PG4001/Sofa-Armrest-Table-Natural-Square-Set_4-1716799505.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692004738/crusader/variants/AS-000403-PG4001/Mori-L-Shape-Sofa-Alpine-Square-Det_2-1692004735.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692004738/crusader/variants/AS-000403-PG4001/Mori-Left-Facing-Chaise-Sectional-Sofa-Alpine-Square-Det_2-1692004735.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692347974/crusader/variants/AS-000403-PG4001/Mori-Ottoman-Alpine-Det_1-1692347969.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691395522/crusader/variants/AS-000403-PG4001/Arden-Swivel-Armchair-Alpine-Square-Det_1-1691395520.jpg"
  ],
  "AS-000860-PG4001-WA": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757054005/crusader/variants/AS-000860-PG4001-WA/Mori-Right-Facing-Chaise-Sofa-Alpine-Walnut-Front-1757054004.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757054005/crusader/variants/AS-000860-PG4001-WA/Mori-Right-Facing-Chaise-Sofa-Alpine-Walnut-Angle-1757054005.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757054005/crusader/variants/AS-000860-PG4001-WA/Mori-Right-Facing-Chaise-Sofa-Alpine-Walnut-Side-1757054005.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757054005/crusader/variants/AS-000860-PG4001-WA/Mori-Right-Facing-Chaise-Sofa-Alpine-Walnut-Back-1757054005.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1759046958/crusader/variants/AS-000860-PG4001-WA/Mori-Right-Facing-Chaise-Sectional-Sofa-With-Ottoman-Alpine-Walnut-Leg-Square-Set_1-1759046958.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1759046958/crusader/variants/AS-000860-PG4001-WA/Mori-Right-Facing-Chaise-Sectional-Sofa-Alpine-With-Side-Table-With-Ottoman-Walnut-Leg-Square-Set_1-1759046958.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1716800253/crusader/variants/AS-000412-PG4001/Sofa-Armrest-Table-Natural-Square-Set_4-1716800253.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757043580/crusader/variants/50441077-PH4001/Mori-L-Shape-Sofa-Alpine-Walnut-Square-Det_2-1757043579.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757043579/crusader/variants/50441077-PH4001/Mori-Left-Facing-Chaise-Sectional-Sofa-Alpine-Walnut-Square-Det_2-1757043579.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757052739/crusader/variants/50441077-PH4001/Mori-Side-Ottoman-Alpine-Walnut-Leg-Det_1-1757052739.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1755497544/crusader/variants/PB-001727-PG4001-WA/Arden-Swivel-Armchair-Alpine-Square-Det_1__1_-1755497542.jpg"
  ],
  "AS-000859-PG4002-NA": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757064364/crusader/variants/AS-000859-PG4002-NA/Mori-Right-Facing-Chaise-Oat-Walnut-Leg-Front-1757064364.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757064366/crusader/variants/AS-000859-PG4002-NA/Mori-Right-Facing-Chaise-Oat-Walnut-Leg-Angle-1757064365.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757064367/crusader/variants/AS-000859-PG4002-NA/Mori-Right-Facing-Chaise-Oat-Walnut-Leg-Side-1757064364.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757064366/crusader/variants/AS-000859-PG4002-NA/Mori-Right-Facing-Chaise-Oat-Walnut-Leg-Back-1757064364.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1759046866/crusader/variants/AS-000859-PG4002-NA/Mori-Right-Facing-Chaise-Sectional-Sofa-Oat-Natural-Leg-With-Ottoman-Oat-Natural-Square-Set_1-1759046866.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1759046866/crusader/variants/AS-000859-PG4002-NA/Mori-Right-Facing-Chaise-Sectional-Sofa-Oat-With-Side-Table-Natural-Leg-Square-Set_1-1759046866.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1716800253/crusader/variants/AS-000412-PG4001/Sofa-Armrest-Table-Natural-Square-Set_4-1716800253.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757043371/crusader/variants/50441077-PH4001/Mori-3-Seater-Sofa-Oat-Natural-Leg-Det_1-1757043371.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757043372/crusader/variants/50441077-PH4001/Mori-Armchair-Oat-Natural-Leg-Det_1-1757043371.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757043371/crusader/variants/50441077-PH4001/Mori-Side-Ottoman-Oat-Natural-Leg-Det_1-1757043371.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757038253/crusader/variants/50441077-PH4001/Mori-Armchair-Oat-Walnut-Leg-Det_2-1757038253.jpg"
  ],
  "AS-000860-PG4002-WA": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757056937/crusader/variants/AS-000860-PG4002-WA/Mori-Right-Facing-Chaise-Oat-Walnut-Leg-Front-1757056937.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757056937/crusader/variants/AS-000860-PG4002-WA/Mori-Right-Facing-Chaise-Oat-Walnut-Leg-Angle-1757056937.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757056937/crusader/variants/AS-000860-PG4002-WA/Mori-Right-Facing-Chaise-Oat-Walnut-Leg-Side-1757056937.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757056937/crusader/variants/AS-000860-PG4002-WA/Mori-Right-Facing-Chaise-Oat-Walnut-Leg-Back-1757056937.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1759046914/crusader/variants/AS-000860-PG4002-WA/Mori-Right-Facing-Chaise-Sectional-Sofa-With-Ottoman-Oat-Walnut-Leg-Square-Set_1-1759046914.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1759046914/crusader/variants/AS-000860-PG4002-WA/Mori-Right-Facing-Chaise-Sectional-Sofa-Oat-With-Side-Table-With-Ottoman-Walnut-Leg-Square-Set_1-1759046914.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1716800253/crusader/variants/AS-000412-PG4001/Sofa-Armrest-Table-Natural-Square-Set_4-1716800253.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757038253/crusader/variants/50441077-PH4001/Mori-Armchair-Oat-Walnut-Leg-Det_1-1757038253.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757038253/crusader/variants/50441077-PH4001/Mori-3-Seater-Sofa-Oat-Walnut-Leg-Det_1-1757038253.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757038253/crusader/variants/50441077-PH4001/Mori-Side-Ottoman-Oat-Walnut-Leg-Det_1-1757038253.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757038253/crusader/variants/50441077-PH4001/Mori-Armchair-Oat-Walnut-Leg-Det_2-1757038253.jpg"
  ],
  "AS-000404-PG4001": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691396300/crusader/variants/AS-000404-PG4001/Mori-Large-Ottoman-Alpine-Side-1691396298.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692257444/crusader/variants/AS-000404-PG4001/Mori-Attachable-Ottoman-Alpine-Set_1-1692257441.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692246083/crusader/variants/AS-000404-PG4001/Mori-Left-Facing-2-Seater-Sofa-With-Side-Table-And-Attachable-Ottoman-Square-Set_1-1692246080.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692246083/crusader/variants/AS-000404-PG4001/Mori-Left-Facing-Chaise-Sectional-Sofa-With-Attachable-Ottoman-Square-Set_4-1692246080.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692002858/crusader/variants/AS-000404-PG4001/Mori-Armless-L-Shape-Sectional-Sofa-Alpine-Square-Det_2-1692002855.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692347987/crusader/variants/AS-000404-PG4001/Mori-Ottoman-Alpine-Det_1-1692347984.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691395662/crusader/variants/AS-000404-PG4001/Arden-Swivel-Armchair-Alpine-Square-Det_1-1691395660.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691396300/crusader/variants/AS-000404-PG4001/Mori-Large-Ottoman-Alpine-Angle-1691396298.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691396299/crusader/variants/AS-000404-PG4001/Mori-Large-Ottoman-Alpine-Front-1691396297.png"
  ],
  "AS-000863-PG4001-NA": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691396300/crusader/variants/AS-000404-PG4001/Mori-Large-Ottoman-Alpine-Side-1691396298.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691396300/crusader/variants/AS-000404-PG4001/Mori-Large-Ottoman-Alpine-Angle-1691396298.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691396299/crusader/variants/AS-000404-PG4001/Mori-Large-Ottoman-Alpine-Front-1691396297.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692257444/crusader/variants/AS-000404-PG4001/Mori-Attachable-Ottoman-Alpine-Set_1-1692257441.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692246083/crusader/variants/AS-000404-PG4001/Mori-Left-Facing-2-Seater-Sofa-With-Side-Table-And-Attachable-Ottoman-Square-Set_1-1692246080.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692246083/crusader/variants/AS-000404-PG4001/Mori-Left-Facing-Chaise-Sectional-Sofa-With-Attachable-Ottoman-Square-Set_4-1692246080.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692002858/crusader/variants/AS-000404-PG4001/Mori-Armless-L-Shape-Sectional-Sofa-Alpine-Square-Det_2-1692002855.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692347987/crusader/variants/AS-000404-PG4001/Mori-Ottoman-Alpine-Det_1-1692347984.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691395662/crusader/variants/AS-000404-PG4001/Arden-Swivel-Armchair-Alpine-Square-Det_1-1691395660.jpg"
  ],
  "AS-000864-PG4001-WA": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757054123/crusader/variants/AS-000864-PG4001-WA/Mori-Side-Ottoman-Alpine-Walnut-Side-1757054123.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757054123/crusader/variants/AS-000864-PG4001-WA/Mori-Side-Ottoman-Alpine-Walnut-Front-1757054123.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757054123/crusader/variants/AS-000864-PG4001-WA/Mori-Side-Ottoman-Alpine-Walnut-Angle-1757054123.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1761790244/crusader/variants/AS-000864-PG4001-WA/Mori-Right-Facing-2-Seater-Sofa-With-Side-Table-With-Attachable-Ottoman-Alpine-Walnut-Set_1__1_-1761790243.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757043579/crusader/variants/50441077-PH4001/Mori-Armless-L-Shape-Sectional-Sofa-Alpine-Walnut-Square-Det_2-1757043579.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757052739/crusader/variants/50441077-PH4001/Mori-Side-Ottoman-Alpine-Walnut-Leg-Det_1-1757052739.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1755497544/crusader/variants/PB-001727-PG4001-WA/Arden-Swivel-Armchair-Alpine-Square-Det_1__1_-1755497542.jpg"
  ],
  "AS-000863-PG4002-NA": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757063659/crusader/variants/AS-000863-PG4002-NA/Mori-Side-Ottoman-Oat-Natural-Leg-Front-1757063658.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757063659/crusader/variants/AS-000863-PG4002-NA/Mori-Side-Ottoman-Oat-Natural-Leg-Angle-1757063658.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757063659/crusader/variants/AS-000863-PG4002-NA/Mori-Side-Ottoman-Oat-Natural-Leg-Side-1757063658.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1761790651/crusader/variants/AS-000863-PG4002-NA/Mori-Right-Facing-2-Seater-Sofa-With-Side-Table-And-Attachable-Ottoman-Alpine-Natural-Set_1-1761790651.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757064549/crusader/variants/AS-000863-PG4002-NA/Mori-Armless-L-Shaped-Sectional-Sofa-Oat-Natural-Leg-Det_1-1757064549.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757043371/crusader/variants/50441077-PH4001/Mori-Side-Ottoman-Oat-Natural-Leg-Det_1-1757043371.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757038253/crusader/variants/50441077-PH4001/Mori-Armchair-Oat-Walnut-Leg-Det_2-1757038253.jpg"
  ],
  "AS-000864-PG4002-WA": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757057009/crusader/variants/AS-000864-PG4002-WA/Mori-Side-Ottoman-Oat-Walnut-Leg-Front-1757057009.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757057009/crusader/variants/AS-000864-PG4002-WA/Mori-Side-Ottoman-Oat-Walnut-Leg-Angle-1757057009.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757057009/crusader/variants/AS-000864-PG4002-WA/Mori-Side-Ottoman-Oat-Walnut-Leg-Side-1757057009.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757038253/crusader/variants/50441077-PH4001/Mori-Armless-L-Shaped-Sectional-Sofa-Oat-Det_1-1757038253.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757038253/crusader/variants/50441077-PH4001/Mori-Side-Ottoman-Oat-Walnut-Leg-Det_1-1757038253.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757038253/crusader/variants/50441077-PH4001/Mori-Armchair-Oat-Walnut-Leg-Det_2-1757038253.jpg"
  ],
  "50430004-LGY": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710840472/crusader/variants/50430004-LGY/Grace-Light-Grey-Cereal-Bowls-Set-of-4_Front-1710840469.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1715064517/crusader/variants/50430004-LGY/Grace-4-Light-Grey-White-Dinnerware-Set-Square-Set_1-1715064517.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710840472/crusader/variants/50430004-LGY/Grace-Cereal-Bowl-Light-Grey-Square-Det_1-1710840469.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1715064517/crusader/variants/50430004-LGY/Grace-Collection-Square-Set_1-1715064517.jpg"
  ],
  "50430004-SWE": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710840491/crusader/variants/50430004-SWE/Grace-Snow-White-Cereal-Bowls-Set-of-4_Front-1710840488.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1715064485/crusader/variants/50430004-SWE/Grace-4-Piece-Snow-White-Dinnerware-Set-Square-Set_1-1715064485.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710840491/crusader/variants/50430004-SWE/Grace-Cereal-Bowl-Snow-White-Square-Det_1-1710840488.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1715064485/crusader/variants/50430004-SWE/Grace-Collection-Square-Set_1-1715064485.jpg"
  ],
  "50430009-SND": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710838405/crusader/variants/50430009-SND/Audrey-Sand-Salad-Plates-Set-of-4_Front-1710838402.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1715065341/crusader/variants/50430009-SND/Audrey-4-Piece-Sand-Dinnerware-Set-Square-Set_1-1715065341.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710838425/crusader/variants/50430009-SND/Audrey-Sand-Dinner-Plate-Square-Det_1-1710838423.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1715065341/crusader/variants/50430009-SND/Audrey-20-Piece-Sand-Dinnerware-Set-Square-Set_1-1715065340.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710838643/crusader/variants/50430009-BCY/Audrey-Collection-Square-Set_1-1710838640.jpg"
  ],
  "50430009-BRD": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710838486/crusader/variants/50430009-BRD/Audrey-Brick-Red-Salad-Plates-Set-of-4_Front-1710838484.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1715065472/crusader/variants/50430009-BRD/Audrey-4-Piece-Brick-Red-Dinnerware-Set-Square-Set_1-1715065471.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710838531/crusader/variants/50430009-BRD/Audrey-Brick-Red-Dinner-Plate-Square-Det_1-1710838529.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1715065472/crusader/variants/50430009-BRD/Audrey-20-Piece-Brick-Red-Dinnerware-Set-Square-Set_1-1715065472.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710838643/crusader/variants/50430009-BCY/Audrey-Collection-Square-Set_1-1710838640.jpg"
  ],
  "50430009-BCY": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710838549/crusader/variants/50430009-BCY/Audrey-Brown-Clay-Salad-Plates-Set-of-4_Front-1710838547.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1715065548/crusader/variants/50430009-BCY/Audrey-4-Piece-Brown-Clay-Dinnerware-Set-Square-Set_1-1715065548.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710838630/crusader/variants/50430009-BCY/Audrey-Brown-Clay-Dinner-Plate-Square-Det_1-1710838628.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1715065548/crusader/variants/50430009-BCY/Audrey-20-Piece-Sand-Dinnerware-Set-Square-Set_1-1715065548.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710838643/crusader/variants/50430009-BCY/Audrey-Collection-Square-Set_1-1710838640.jpg"
  ],
  "50430010-BRD": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710838739/crusader/variants/50430010-BRD/Audrey-Brick-Red-Serving-Bowls-Set-of-4_Front-1710838736.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1715065625/crusader/variants/50430010-BRD/Audrey-4-Piece-Brick-Red-Dinnerware-Set-Square-Set_1-1715065625.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710838755/crusader/variants/50430010-BRD/Audrey-Brick-Red-Serving-Bowl-Square-Det_1-1710838753.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1715065625/crusader/variants/50430010-BRD/Audrey-20-Piece-Brick-Red-Dinnerware-Set-Square-Set_1-1715065625.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710838844/crusader/variants/50430010-BCY/Audrey-Collection-Square-Set_1-1710838842.jpg"
  ],
  "50430010-BCY": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710838812/crusader/variants/50430010-BCY/Audrey-Brown-Clay-Serving-Bowls-Set-of-4_Front-1710838810.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1715065671/crusader/variants/50430010-BCY/Audrey-4-Piece-Brown-Clay-Dinnerware-Set-Square-Set_1-1715065671.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710838832/crusader/variants/50430010-BCY/Audrey-Brown-Clay-Serving-Bowl-Square-Det_1-1710838830.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1715065671/crusader/variants/50430010-BCY/Audrey-20-Piece-Brown-Clay-Dinnerware-Set-Square-Set_1-1715065671.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710838844/crusader/variants/50430010-BCY/Audrey-Collection-Square-Set_1-1710838842.jpg"
  ],
  "50430011-SND": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710838900/crusader/variants/50430011-SND/Audrey-Sand-Cereal-Bowls-Set-of-4_Front-1710838898.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1715065593/crusader/variants/50430011-SND/Audrey-4-Piece-Sand-Dinnerware-Set-Square-Set_1-1715065593.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710838900/crusader/variants/50430011-SND/Audrey-Sand-Serving-Bowl-Square-Det_1-1710838898.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1715065592/crusader/variants/50430011-SND/Audrey-20-Piece-Sand-Dinnerware-Set-Square-Set_1-1715065592.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710838868/crusader/variants/50430011-BCY/Audrey-Collection-Square-Set_1-1710838865.jpg"
  ],
  "50430011-BRD": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710838933/crusader/variants/50430011-BRD/Audrey-Brick-Red-Cereal-Bowls-Set-of-4_Front-1710838931.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1715065710/crusader/variants/50430011-BRD/Audrey-4-Piece-Brick-Red-Dinnerware-Set-Square-Set_1-1715065710.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710838933/crusader/variants/50430011-BRD/Audrey-Brick-Red-Serving-Bowl-Square-Det_1-1710838931.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1715065711/crusader/variants/50430011-BRD/Audrey-20-Piece-Brick-Red-Dinnerware-Set-Square-Set_1-1715065710.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710838868/crusader/variants/50430011-BCY/Audrey-Collection-Square-Set_1-1710838865.jpg"
  ],
  "50430011-BCY": [
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710838961/crusader/variants/50430011-BCY/Audrey-Brown-Clay-Cereal-Bowls-Set-of-4_Front-1710838959.png",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1715065734/crusader/variants/50430011-BCY/Audrey-4-Piece-Brown-Clay-Dinnerware-Set-Square-Set_1-1715065734.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710838961/crusader/variants/50430011-BCY/Audrey-Brown-Clay-Serving-Bowl-Square-Det_1-1710838959.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1715065734/crusader/variants/50430011-BCY/Audrey-20-Piece-Brown-Clay-Dinnerware-Set-Square-Set_1-1715065733.jpg",
    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710838868/crusader/variants/50430011-BCY/Audrey-Collection-Square-Set_1-1710838865.jpg"
  ]
};

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
    metadata: {
    "material": "600D Polyester with PVC backing",
    "dimensions": "W150 x D89 x H52cm",
    "warranty": "1-year limited warranty"
},
    category_ids: [categories.find(c => c.name === "Outdoor")?.id, categories.find(c => c.name === "Outdoor Furniture Covers")?.id].filter((id): id is string => Boolean(id)),
    tag_ids: [tags.find(t => t.value === "storewide_sale")?.id, tags.find(t => t.value === "all furniture excluding accessories\t")?.id, tags.find(t => t.value === "storewide exclude beige covers")?.id, tags.find(t => t.value === "all products")?.id, tags.find(t => t.value === "gss event storewide sale excluding gwp")?.id, tags.find(t => t.value === "all product excluding customisation")?.id, tags.find(t => t.value === "match & save")?.id].filter((id): id is string => Boolean(id)),
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
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709284626/crusader/variants/T50110042/Sierra-Outdoor-2-Seater-Sofa-Cover-ivory-Dim-1709284623.png"
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
        metadata: {
          "fabric_composition": "100% Polyester",
          "general_dimensions": "W150 x D86 x H52cm",
          "packaging_dimensions": "1 box",
          "cancellation": "Free—5 working days before delivery",
          "returns": "30-day returns",
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709284607/crusader/variants/50440921-IV/Sierra-Outdoor-2-Seater-Sofa-Cover-Angle-ivory-1709284605.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709288688/crusader/variants/50440921-IV/Redesign-Sierra-Right-Facing-2-Seater-Sofa_-Cover_1-1709288686.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1695019330/crusader/variants/50440848-IV/Outdoor-Fabric_New_1_US-1695019329.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1708418410/crusader/variants/50440884-IV/Outdoor-Fabric_New-1708418407.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691118112/crusader/variants/50440845-IV/Sierra-Outdoor-Sofa-Cover-Sketch-Map-AU-1691118110.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709284626/crusader/variants/T50110042/Sierra-Outdoor-2-Seater-Sofa-Cover-ivory-Dim-1709284623.png"
          ]
},
        prices: [
          {
            amount: 10000,
            currency_code: 'usd',
          },
          {
            amount: 10000,
            currency_code: 'usd',
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
    metadata: {
    "material": "600D Polyester with PVC backing",
    "dimensions": "W232 x D89 x H52cm",
    "warranty": "1-year limited warranty"
},
    category_ids: [categories.find(c => c.name === "Outdoor")?.id, categories.find(c => c.name === "Outdoor Furniture Covers")?.id].filter((id): id is string => Boolean(id)),
    tag_ids: [tags.find(t => t.value === "storewide_sale")?.id, tags.find(t => t.value === "all furniture excluding accessories\t")?.id, tags.find(t => t.value === "storewide exclude beige covers")?.id, tags.find(t => t.value === "all products")?.id, tags.find(t => t.value === "gss event storewide sale excluding gwp")?.id, tags.find(t => t.value === "all product excluding customisation")?.id, tags.find(t => t.value === "match & save")?.id].filter((id): id is string => Boolean(id)),
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
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709284698/crusader/variants/T50110041/Sierra-Outdoor-3-Seater-Sofa-Cover-ivory-Dim-1709284696.png"
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
        metadata: {
          "fabric_composition": "100% Polyester",
          "general_dimensions": "W232 x D86 x H52cm",
          "packaging_dimensions": "1 box",
          "cancellation": "Free—5 working days before delivery",
          "returns": "30-day returns",
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709284649/crusader/variants/50440926-IV/Sierra-Outdoor-3-Seater-Sofa-Cover-Angle-ivory-1709284647.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709520492/crusader/variants/50440926-IV/Redesign-Sierra-3-Seater-Sofa__-Cover_1-1709520489.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1695019330/crusader/variants/50440848-IV/Outdoor-Fabric_New_1_US-1695019329.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1708418410/crusader/variants/50440884-IV/Outdoor-Fabric_New-1708418407.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691118112/crusader/variants/50440845-IV/Sierra-Outdoor-Sofa-Cover-Sketch-Map-AU-1691118110.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709284698/crusader/variants/T50110041/Sierra-Outdoor-3-Seater-Sofa-Cover-ivory-Dim-1709284696.png"
          ]
},
        prices: [
          {
            amount: 11000,
            currency_code: 'usd',
          },
          {
            amount: 11000,
            currency_code: 'usd',
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
    metadata: {
    "material": "600D Polyester with PVC backing",
    "dimensions": "W100 x D89 x H52cm",
    "warranty": "1-year limited warranty"
},
    category_ids: [categories.find(c => c.name === "Outdoor")?.id, categories.find(c => c.name === "Outdoor Furniture Covers")?.id].filter((id): id is string => Boolean(id)),
    tag_ids: [tags.find(t => t.value === "storewide_sale")?.id, tags.find(t => t.value === "all furniture excluding accessories\t")?.id, tags.find(t => t.value === "storewide exclude beige covers")?.id, tags.find(t => t.value === "all products")?.id, tags.find(t => t.value === "gss event storewide sale excluding gwp")?.id, tags.find(t => t.value === "all product excluding customisation")?.id, tags.find(t => t.value === "match & save")?.id].filter((id): id is string => Boolean(id)),
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
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709284742/crusader/variants/T50110040/Sierra-Outdoor-Lounge-Chair-Cover-ivory-Dim-1709284740.png"
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
        metadata: {
          "fabric_composition": "100% Polyester",
          "general_dimensions": "W100 x D86 x H52cm",
          "packaging_dimensions": "1 box",
          "cancellation": "Free—5 working days before delivery",
          "returns": "30-day returns",
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709284722/crusader/variants/50440920-IV/Sierra-Outdoor-Lounge-Chair-Cover-Angle-ivory-1709284720.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709288799/crusader/variants/50440920-IV/Redesign-Sierra-Lounge-Chair-Cover_1-1709288797.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1695019330/crusader/variants/50440848-IV/Outdoor-Fabric_New_1_US-1695019329.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1708418410/crusader/variants/50440884-IV/Outdoor-Fabric_New-1708418407.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691118112/crusader/variants/50440845-IV/Sierra-Outdoor-Sofa-Cover-Sketch-Map-AU-1691118110.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709284742/crusader/variants/T50110040/Sierra-Outdoor-Lounge-Chair-Cover-ivory-Dim-1709284740.png"
          ]
},
        prices: [
          {
            amount: 8000,
            currency_code: 'usd',
          },
          {
            amount: 8000,
            currency_code: 'usd',
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
    metadata: {
    "material": "Solid beech wood frame with engineered wood shelves",
    "care": "Storage furniture",
    "dimensions": "W180 x D47.5 x H57.5cm",
    "weight": "65kg",
    "warranty": "5-year limited warranty",
    "assembly": "Legs to be fitted"
},
    category_ids: [categories.find(c => c.name === "TV Consoles")?.id, categories.find(c => c.name === "Storage")?.id].filter((id): id is string => Boolean(id)),
    tag_ids: [tags.find(t => t.value === "bestsellers")?.id, tags.find(t => t.value === "storewide_sale")?.id, tags.find(t => t.value === "all furniture excluding accessories\t")?.id, tags.find(t => t.value === "storewide exclude beige covers")?.id, tags.find(t => t.value === "gss event storewide sale excluding gwp")?.id, tags.find(t => t.value === "all product excluding customisation")?.id, tags.find(t => t.value === "match & save")?.id, tags.find(t => t.value === "all_tv_stands")?.id, tags.find(t => t.value === "all products")?.id, tags.find(t => t.value === "style_midcenturymodern")?.id, tags.find(t => t.value === "sofa_bundle_complementary_products")?.id, tags.find(t => t.value === "tv_console")?.id].filter((id): id is string => Boolean(id)),
    
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
        metadata: {
          "safety_tip": "Anti-tip prevention",
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1624960646/crusader/variants/52460065/August-TV-Console-Front.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1627892951/crusader/variants/52460065/August-TV-Console-Dim.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1624960656/crusader/variants/52460065/August-TV-Console-Angle.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1624960660/crusader/variants/52460065/August-TV-Console-Side.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1624960662/crusader/variants/52460065/August-TV-Console-Back.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1624960642/crusader/variants/52460065/August-TV-Console-Lifestyle-Crop.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1624960647/crusader/variants/52460065/August-TV-Console-D4.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1624960651/crusader/variants/52460065/August-TV-Console-D9.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1624960649/crusader/variants/52460065/August-TV-Console-D6.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1624960645/crusader/variants/52460065/August-TV-Console-D2.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1624960648/crusader/variants/52460065/August-TV-Console-D5.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1624960650/crusader/variants/52460065/August-TV-Console-D8.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1624960647/crusader/variants/52460065/August-TV-Console-D3.jpg"
          ]
},
        prices: [
          {
            amount: 149900,
            currency_code: 'usd',
          },
          {
            amount: 149900,
            currency_code: 'usd',
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
        metadata: {
          "safety_tip": "Anti-tip prevention",
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1624960646/crusader/variants/52460065/August-TV-Console-Front.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1627892951/crusader/variants/52460065/August-TV-Console-Dim.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1624960656/crusader/variants/52460065/August-TV-Console-Angle.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1624960660/crusader/variants/52460065/August-TV-Console-Side.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1624960662/crusader/variants/52460065/August-TV-Console-Back.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1624960642/crusader/variants/52460065/August-TV-Console-Lifestyle-Crop.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1624960647/crusader/variants/52460065/August-TV-Console-D4.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1624960651/crusader/variants/52460065/August-TV-Console-D9.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1624960649/crusader/variants/52460065/August-TV-Console-D6.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1624960645/crusader/variants/52460065/August-TV-Console-D2.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1624960648/crusader/variants/52460065/August-TV-Console-D5.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1624960650/crusader/variants/52460065/August-TV-Console-D8.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1624960647/crusader/variants/52460065/August-TV-Console-D3.jpg"
          ]
},
        prices: [
          {
            amount: 149900,
            currency_code: 'usd',
          },
          {
            amount: 149900,
            currency_code: 'usd',
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
    metadata: {
    "material": "Laminated veneer lumber and plywood, rubber wood leg",
    "care": "Fabric sofa, wooden legs",
    "filling": "Foam, fibre and pocket spring filled seat; Fibre filled back; Foam filled frame",
    "cover_type": "Removable back cushion and bolster covers",
    "dimensions": "W204 x D96.5 x H86.5cm",
    "weight": "54.5kg",
    "seating_depth": "61cm",
    "seating_height": "47cm",
    "comfort_ratings": {
        "overall_sit_rating": "2",
        "seat_depth_rating": "4",
        "seat_height_rating": "4",
        "seat_softness_rating": "3"
    },
    "warranty": "Frame 10 years; Fabric 1 year; Foam 2 years",
    "assembly": "Legs to be fitted"
},
    category_ids: [categories.find(c => c.name === "3 Seater Sofas")?.id, categories.find(c => c.name === "Sofa & Armchairs")?.id].filter((id): id is string => Boolean(id)),
    tag_ids: [tags.find(t => t.value === "bestsellers")?.id, tags.find(t => t.value === "storewide_sale")?.id, tags.find(t => t.value === "earth_day")?.id, tags.find(t => t.value === "small_living_room_furniture")?.id, tags.find(t => t.value === "small_space_furniture")?.id, tags.find(t => t.value === "all furniture excluding accessories\t")?.id, tags.find(t => t.value === "storewide exclude beige covers")?.id, tags.find(t => t.value === "gss event storewide sale excluding gwp")?.id, tags.find(t => t.value === "all product excluding customisation")?.id, tags.find(t => t.value === "match & save")?.id, tags.find(t => t.value === "all products")?.id, tags.find(t => t.value === "style_midcenturymodern")?.id, tags.find(t => t.value === "s3_event (do not use)")?.id, tags.find(t => t.value === "rounded_furniture")?.id, tags.find(t => t.value === "all_sofa")?.id, tags.find(t => t.value === "holiday")?.id].filter((id): id is string => Boolean(id)),
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
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1655221832/crusader/variants/50440750-AM4001/Madison-3-Seater-Sofa-Bisque-Dim-SG-1655221829.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1625218999/crusader/variants/50440750-TW4002/Madison-3-Seater-Sofa-Stone-Front.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1625218970/crusader/variants/50440750-TW4002/Madison-3-Seater-Sofa-Stone-Angle.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1625219005/crusader/variants/50440750-TW4002/Madison-3-Seater-Sofa-Stone-Side.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1625218985/crusader/variants/50440750-TW4002/Madison-3-Seater-Sofa-Stone-Back.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1625417380/crusader/variants/50440750-TW4002/Madison-3-Seater-Sofa-Stone-Lifestyle-Crop.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1625417372/crusader/variants/50440750-TW4002/Madison-3-Seater-Sofa-Stone-D6.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1625417364/crusader/variants/50440750-TW4002/Madison-3-Seater-Sofa-Stone-D9.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1717399516/crusader/variants/50440750-TW4002/Owen-Sofa-Headrest-Opal-Beige-Square-Det_10-1717399514.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1625417373/crusader/variants/50440750-TW4002/Madison-Armchair-Stone-D3.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1625417371/crusader/variants/50440750-TW4002/Madison-Armchair-Stone-D4.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1625417369/crusader/variants/50440750-TW4002/Madison-Ottoman-Stone-D5.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1625417366/crusader/variants/50440750-TW4002/Madison-3-Seater-Sofa-Stone-D8.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1655221061/crusader/variants/50440750-TW4002/Madison-3-Seater-Sofa-Stone-Dim-1655221058.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757405355/crusader/variants/50440728-CM4001/Madison-3-Seater-Sofa-Forest-Front-1757405355.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757405355/crusader/variants/50440728-CM4001/Madison-3-Seater-Sofa-Forest-Angle-1757405355.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757405354/crusader/variants/50440728-CM4001/Madison-3-Seater-Sofa-Forest-Side-1757405354.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757405355/crusader/variants/50440728-CM4001/Madison-3-Seater-Sofa-Forest-Back-1757405355.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1760166303/crusader/variants/50440728-CM4001/Madison-3-Seater-Sofa-Forest-Square-Set_2-1760166303.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1760166303/crusader/variants/50440728-CM4001/Madison-3-Seater-Sofa-With-Ottoman-Forest-Square-Set_1-1760166303.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1760166302/crusader/variants/50440728-CM4001/Madison-3-Seater-Sofa-With-Armchair-Forest-Square-Set_1-1760166302.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1716790310/crusader/variants/PB-000850-AM4001/Owen-Sofa-Headrest-Opal-Beige-Square-Det_10-1716790310.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1760166303/crusader/variants/50440728-CM4001/Madison-3-Seater-Sofa-With-Ottoman-Forest-Square-Det_2-1760166303.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1760166303/crusader/variants/50440728-CM4001/Madison-3-Seater-Sofa-With-Ottoman-Forest-Square-Det_1-1760166303.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757405355/crusader/variants/50440728-CM4001/Madison-3-Seater-Sofa-Forest-Det_2-1757405355.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757405354/crusader/variants/50440728-CM4001/Madison-3-Seater-Sofa-Forest-Det_4-1757405354.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757405355/crusader/variants/50440728-CM4001/Madison-3-Seater-Sofa-Forest-Det_1-1757405355.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1754899654/crusader/variants/T50440750/Madison-3-Seater-Sofa-Forest-Dim-SG-1754899652.png"
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
        metadata: {
          "fabric_composition": "80% Polyester, 20% Cotton",
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1646386187/crusader/variants/50440750-AM4001/Madison-3-Seater-Sofa-Bisque-Front-SG.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1646386187/crusader/variants/50440750-AM4001/Madison-3-Seater-Sofa-Bisque-Angle-SG.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1645670446/crusader/variants/50440728-AM4001/Madison-3-Seater-Sofa-Bisque-Side.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1743557693/crusader/variants/50440750-AM4001/Madison-3-Seater-Sofa-Bisque-Back-SG-1743557690.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1645670813/crusader/variants/50440728-AM4001/Madison-3-Seater-Sofa-Bisque-Square-Set_5.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1645688196/crusader/variants/50440728-AM4001/Madison-Sofa-Collection-Bisque-Square-Set_1.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1716790934/crusader/variants/50440728-AM4001/Owen-Sofa-Headrest-Opal-Beige-Square-Det_10-1716790934.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1645670873/crusader/variants/50440728-AM4001/Madison-3-Seater-Sofa-Bisque-Square-Det_4.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1645670873/crusader/variants/50440728-AM4001/Madison-3-Seater-Sofa-Bisque-Square-Det_2.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1645670873/crusader/variants/50440728-AM4001/Madison-3-Seater-Sofa-Bisque-Square-Det_5.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1645670872/crusader/variants/50440728-AM4001/Madison-3-Seater-Sofa-Bisque-Square-Det_3.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1655221832/crusader/variants/50440750-AM4001/Madison-3-Seater-Sofa-Bisque-Dim-SG-1655221829.png"
          ]
},
        prices: [
          {
            amount: 119900,
            currency_code: 'usd',
          },
          {
            amount: 119900,
            currency_code: 'usd',
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
        metadata: {
          "cancellation": "Clearance—no cancellation",
          "returns": "Clearance—no return or exchange",
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1625218999/crusader/variants/50440750-TW4002/Madison-3-Seater-Sofa-Stone-Front.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1625218970/crusader/variants/50440750-TW4002/Madison-3-Seater-Sofa-Stone-Angle.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1625219005/crusader/variants/50440750-TW4002/Madison-3-Seater-Sofa-Stone-Side.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1625218985/crusader/variants/50440750-TW4002/Madison-3-Seater-Sofa-Stone-Back.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1625417380/crusader/variants/50440750-TW4002/Madison-3-Seater-Sofa-Stone-Lifestyle-Crop.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1625417372/crusader/variants/50440750-TW4002/Madison-3-Seater-Sofa-Stone-D6.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1625417364/crusader/variants/50440750-TW4002/Madison-3-Seater-Sofa-Stone-D9.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1717399516/crusader/variants/50440750-TW4002/Owen-Sofa-Headrest-Opal-Beige-Square-Det_10-1717399514.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1625417373/crusader/variants/50440750-TW4002/Madison-Armchair-Stone-D3.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1625417371/crusader/variants/50440750-TW4002/Madison-Armchair-Stone-D4.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1625417369/crusader/variants/50440750-TW4002/Madison-Ottoman-Stone-D5.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1625417366/crusader/variants/50440750-TW4002/Madison-3-Seater-Sofa-Stone-D8.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1655221061/crusader/variants/50440750-TW4002/Madison-3-Seater-Sofa-Stone-Dim-1655221058.png"
          ]
},
        prices: [
          {
            amount: 107900,
            currency_code: 'usd',
          },
          {
            amount: 107900,
            currency_code: 'usd',
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
        metadata: {
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757405355/crusader/variants/50440728-CM4001/Madison-3-Seater-Sofa-Forest-Front-1757405355.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757405355/crusader/variants/50440728-CM4001/Madison-3-Seater-Sofa-Forest-Angle-1757405355.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757405354/crusader/variants/50440728-CM4001/Madison-3-Seater-Sofa-Forest-Side-1757405354.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757405355/crusader/variants/50440728-CM4001/Madison-3-Seater-Sofa-Forest-Back-1757405355.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1760166303/crusader/variants/50440728-CM4001/Madison-3-Seater-Sofa-Forest-Square-Set_2-1760166303.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1760166303/crusader/variants/50440728-CM4001/Madison-3-Seater-Sofa-With-Ottoman-Forest-Square-Set_1-1760166303.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1760166302/crusader/variants/50440728-CM4001/Madison-3-Seater-Sofa-With-Armchair-Forest-Square-Set_1-1760166302.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1716790310/crusader/variants/PB-000850-AM4001/Owen-Sofa-Headrest-Opal-Beige-Square-Det_10-1716790310.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1760166303/crusader/variants/50440728-CM4001/Madison-3-Seater-Sofa-With-Ottoman-Forest-Square-Det_2-1760166303.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1760166303/crusader/variants/50440728-CM4001/Madison-3-Seater-Sofa-With-Ottoman-Forest-Square-Det_1-1760166303.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757405355/crusader/variants/50440728-CM4001/Madison-3-Seater-Sofa-Forest-Det_2-1757405355.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757405354/crusader/variants/50440728-CM4001/Madison-3-Seater-Sofa-Forest-Det_4-1757405354.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757405355/crusader/variants/50440728-CM4001/Madison-3-Seater-Sofa-Forest-Det_1-1757405355.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1754899654/crusader/variants/T50440750/Madison-3-Seater-Sofa-Forest-Dim-SG-1754899652.png"
          ]
},
        prices: [
          {
            amount: 119900,
            currency_code: 'usd',
          },
          {
            amount: 119900,
            currency_code: 'usd',
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
    metadata: {
    "material": "600D Polyester with PVC backing",
    "dimensions": "W122 x D61 x H36cm",
    "warranty": "1-year limited warranty"
},
    category_ids: [categories.find(c => c.name === "Outdoor")?.id, categories.find(c => c.name === "Outdoor Furniture Covers")?.id].filter((id): id is string => Boolean(id)),
    tag_ids: [tags.find(t => t.value === "storewide_sale")?.id, tags.find(t => t.value === "all furniture excluding accessories\t")?.id, tags.find(t => t.value === "storewide exclude beige covers")?.id, tags.find(t => t.value === "all products")?.id, tags.find(t => t.value === "gss event storewide sale excluding gwp")?.id, tags.find(t => t.value === "all product excluding customisation")?.id, tags.find(t => t.value === "match & save")?.id].filter((id): id is string => Boolean(id)),
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
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709284829/crusader/variants/T50110044/Sierra-Outdoor-Coffee-Table-Cover-ivory-Dim-1709284826.png"
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
        metadata: {
          "fabric_composition": "100% Polyester",
          "general_dimensions": "W122 x D60 x H38cm",
          "packaging_dimensions": "1 box",
          "cancellation": "Free—5 working days before delivery",
          "returns": "30-day returns",
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709284814/crusader/variants/50440922-IV/Sierra-Outdoor-Coffee-Table-Cover-Angle-ivory-1709284811.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709288816/crusader/variants/50440922-IV/Redesign-Sierra-Coffee-Table-Cover_1-1709288814.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1695019330/crusader/variants/50440848-IV/Outdoor-Fabric_New_1_US-1695019329.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1708418410/crusader/variants/50440884-IV/Outdoor-Fabric_New-1708418407.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691118112/crusader/variants/50440845-IV/Sierra-Outdoor-Sofa-Cover-Sketch-Map-AU-1691118110.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709284829/crusader/variants/T50110044/Sierra-Outdoor-Coffee-Table-Cover-ivory-Dim-1709284826.png"
          ]
},
        prices: [
          {
            amount: 6000,
            currency_code: 'usd',
          },
          {
            amount: 6000,
            currency_code: 'usd',
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
    metadata: {
    "material": "Frame: aluminium and resin wicker; Seat: foam and fibre; Back: fibre",
    "care": "Outdoor lounge",
    "cover_type": "Removable cushion covers",
    "dimensions": "W151 x D86 x H76cm",
    "weight": "23.4kg",
    "seating_depth": "60cm",
    "seating_height": "40cm",
    "comfort_ratings": {
        "overall_sit_rating": "1",
        "seat_depth_rating": "4",
        "seat_height_rating": "2",
        "seat_softness_rating": "2"
    },
    "warranty": "Frame 5 years; Fabric 1 year; Foam 2 years",
    "assembly": "Fully assembled"
},
    category_ids: [categories.find(c => c.name === "Outdoor")?.id, categories.find(c => c.name === "Outdoor Modular 2-Seater Sofas")?.id].filter((id): id is string => Boolean(id)),
    tag_ids: [tags.find(t => t.value === "storewide_sale")?.id, tags.find(t => t.value === "all furniture excluding accessories\t")?.id, tags.find(t => t.value === "storewide exclude beige covers")?.id, tags.find(t => t.value === "beige cover fur")?.id, tags.find(t => t.value === "all products")?.id, tags.find(t => t.value === "gss event storewide sale excluding gwp")?.id, tags.find(t => t.value === "all product excluding customisation")?.id, tags.find(t => t.value === "match & save")?.id].filter((id): id is string => Boolean(id)),
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
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709275279/crusader/variants/T50110036/Redesign-Sierra-Right-Facing-2-Seater-Sofa_-Dim-1709275276.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709520874/crusader/variants/AS-000518-CO4001/Redesign-Sierra-Right-Facing-2-Seater-Sofa_-Cover-1709520871.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709275179/crusader/variants/AS-000518-CO4001/Redesign-Sierra-Right-Facing-2-Seater-Sofa_-Front-1709275176.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709275179/crusader/variants/AS-000518-CO4001/Redesign-Sierra-Right-Facing-2-Seater-Sofa_-Angle-1709275176.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709275179/crusader/variants/AS-000518-CO4001/Redesign-Sierra-Right-Facing-2-Seater-Sofa_-Side-1709275176.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709275179/crusader/variants/AS-000518-CO4001/Redesign-Sierra-Right-Facing-2-Seater-Sofa_-Back-1709275176.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709275205/crusader/variants/AS-000518-CO4001/Redesign-Sierra-3-Seater-Sofa-Det_3-1709275198.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709275205/crusader/variants/AS-000518-CO4001/Redesign-Sierra-3-Seater-Sofa-Det_9-1709275199.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709275205/crusader/variants/AS-000518-CO4001/Redesign-Sierra-3-Seater-Sofa-Det_8-1709275198.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709275201/crusader/variants/AS-000518-CO4001/Redesign-Sierra-3-Seater-Sofa-Det_11-1709275198.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691118112/crusader/variants/50440845-IV/Sierra-Outdoor-Sofa-Cover-Sketch-Map-AU-1691118110.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709275293/crusader/variants/T50110036/Redesign-Sierra-Right-Facing-2-Seater-Sofa_-Dim-1709275290.png"
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
        metadata: {
          "material": "Frame: aluminium and resin wicker; Seat and Back: fabric with PU foam",
          "fabric_composition": "100% Olefin",
          "general_dimensions": "W151.5 x D88 x H77​cm",
          "armrest_height": "77cm",
          "product_weight": "22.68kg",
          "leg_height": "18cm",
          "max_bearing_support": "2 x 130kg",
          "seatable_width": "136cm",
          "seating_depth": "63cm",
          "packaging_dimensions": "1 box",
          "seating_height": "40cm",
          "cancellation": "Free—5 working days before delivery",
          "returns": "30-day returns",
          "assembly_condition": "Legs, seat and backrest to be fitted",
          "seat_softness_rating": "3",
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709274106/crusader/variants/50720011-CO4001/Redesign-Sierra-Right-Facing-2-Seater-Sofa_-Front-1709274104.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709274107/crusader/variants/50720011-CO4001/Redesign-Sierra-Right-Facing-2-Seater-Sofa_-Angle-1709274104.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709274106/crusader/variants/50720011-CO4001/Redesign-Sierra-Right-Facing-2-Seater-Sofa_-Side-1709274104.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709274106/crusader/variants/50720011-CO4001/Redesign-Sierra-Right-Facing-2-Seater-Sofa_-Back-1709274104.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709798070/crusader/variants/50720009-CO4001/Redesign-Sierra-3-Seater-Sofa-Copy-1709798063.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709274709/crusader/variants/50720011-CO4001/Redesign-Sierra-3-Seater-Sofa-Det_3-1709274702.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709274709/crusader/variants/50720011-CO4001/Redesign-Sierra-3-Seater-Sofa-Det_8-1709274702.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709274709/crusader/variants/50720011-CO4001/Redesign-Sierra-3-Seater-Sofa-Det_9-1709274702.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709274704/crusader/variants/50720011-CO4001/Redesign-Sierra-3-Seater-Sofa-Det_11-1709274702.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709275279/crusader/variants/T50110036/Redesign-Sierra-Right-Facing-2-Seater-Sofa_-Dim-1709275276.png"
          ]
},
        prices: [
          {
            amount: 109900,
            currency_code: 'usd',
          },
          {
            amount: 109900,
            currency_code: 'usd',
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
        metadata: {
          "material": "Frame: aluminium and resin wicker; Seat and Back: fabric with PU foam",
          "fabric_composition": "100% Olefin",
          "general_dimensions": "W151.5 x D88 x H77​cm",
          "armrest_height": "77cm",
          "product_weight": "22.68kg",
          "leg_height": "18cm",
          "max_bearing_support": "2 x 130kg",
          "seatable_width": "136cm",
          "seating_depth": "63cm",
          "packaging_dimensions": "1 box",
          "seating_height": "40cm",
          "cancellation": "Free—5 working days before delivery",
          "returns": "30-day returns",
          "assembly_condition": "Legs, seat and backrest to be fitted",
          "seat_softness_rating": "3",
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709520874/crusader/variants/AS-000518-CO4001/Redesign-Sierra-Right-Facing-2-Seater-Sofa_-Cover-1709520871.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709275179/crusader/variants/AS-000518-CO4001/Redesign-Sierra-Right-Facing-2-Seater-Sofa_-Front-1709275176.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709275179/crusader/variants/AS-000518-CO4001/Redesign-Sierra-Right-Facing-2-Seater-Sofa_-Angle-1709275176.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709275179/crusader/variants/AS-000518-CO4001/Redesign-Sierra-Right-Facing-2-Seater-Sofa_-Side-1709275176.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709275179/crusader/variants/AS-000518-CO4001/Redesign-Sierra-Right-Facing-2-Seater-Sofa_-Back-1709275176.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709798070/crusader/variants/50720009-CO4001/Redesign-Sierra-3-Seater-Sofa-Copy-1709798063.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709275205/crusader/variants/AS-000518-CO4001/Redesign-Sierra-3-Seater-Sofa-Det_3-1709275198.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709275205/crusader/variants/AS-000518-CO4001/Redesign-Sierra-3-Seater-Sofa-Det_9-1709275199.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709275205/crusader/variants/AS-000518-CO4001/Redesign-Sierra-3-Seater-Sofa-Det_8-1709275198.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709275201/crusader/variants/AS-000518-CO4001/Redesign-Sierra-3-Seater-Sofa-Det_11-1709275198.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691118112/crusader/variants/50440845-IV/Sierra-Outdoor-Sofa-Cover-Sketch-Map-AU-1691118110.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1709275293/crusader/variants/T50110036/Redesign-Sierra-Right-Facing-2-Seater-Sofa_-Dim-1709275290.png"
          ]
},
        prices: [
          {
            amount: 119900,
            currency_code: 'usd',
          },
          {
            amount: 119900,
            currency_code: 'usd',
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
    metadata: {
    "material": "Main Material: solid oak, oak veneer over engineered wood; Door: solid oak; Leg: solid birch",
    "care": "Storage furniture",
    "dimensions": "W200 x D45 x H60cm",
    "weight": "71kg",
    "warranty": "5-year limited warranty",
    "assembly": "Legs to be fitted"
},
    category_ids: [categories.find(c => c.name === "TV Consoles")?.id, categories.find(c => c.name === "Storage")?.id].filter((id): id is string => Boolean(id)),
    tag_ids: [tags.find(t => t.value === "bestsellers")?.id, tags.find(t => t.value === "storewide_sale")?.id, tags.find(t => t.value === "all furniture excluding accessories\t")?.id, tags.find(t => t.value === "storewide exclude beige covers")?.id, tags.find(t => t.value === "gss event storewide sale excluding gwp")?.id, tags.find(t => t.value === "all product excluding customisation")?.id, tags.find(t => t.value === "match & save")?.id, tags.find(t => t.value === "all_tv_stands")?.id, tags.find(t => t.value === "highlight")?.id, tags.find(t => t.value === "all products")?.id, tags.find(t => t.value === "roz_1")?.id, tags.find(t => t.value === "style_modernfarmhouse")?.id, tags.find(t => t.value === "sofa_bundle_complementary_products")?.id, tags.find(t => t.value === "tv_console")?.id, tags.find(t => t.value === "furniture_with_storage")?.id, tags.find(t => t.value === "minimalist_furniture")?.id, tags.find(t => t.value === "new_arrivals")?.id, tags.find(t => t.value === "s1_2023_skus")?.id].filter((id): id is string => Boolean(id)),
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
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1675847359/crusader/variants/50220001/Sawyer-TV-Console-Dim-1675847357.png"
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
        metadata: {
          "safety_tip": "Anti-tip prevention",
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1673927310/crusader/variants/50220001/Sawyer-TV-Console-Angle-1673927308.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1675760427/crusader/variants/50220001/Sawyer-TV-Console-Front-1675760425.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1673927310/crusader/variants/50220001/Sawyer-TV-Console-Front_1-1673927308.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1673927310/crusader/variants/50220001/Sawyer-TV-Console-Side-1673927308.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1673927310/crusader/variants/50220001/Sawyer-TV-Console-Back_-1673927308.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1677755596/crusader/variants/50220001/Sawyer-TV-Stand-Square-Set_1-1677755593.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1678342015/crusader/variants/50220001/Sawyer-TV-Stand-Square-Det_2-1678342013.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1679369980/crusader/variants/50220001/Sawyer-Sideboard_Copy-1679369978.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1678341923/crusader/variants/50220001/Sawyer-TV-Stand-Square-Set_2-1678341920.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1676864857/crusader/variants/50220001/Sawyer-Wood-Disclamer-1676864855.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1675847359/crusader/variants/50220001/Sawyer-TV-Console-Dim-1675847357.png"
          ]
},
        prices: [
          {
            amount: 119900,
            currency_code: 'usd',
          },
          {
            amount: 119900,
            currency_code: 'usd',
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
    metadata: {
    "material": "Solid acacia wood",
    "care": "Extendable table",
    "dimensions": "W150/200 x D90 x H75cm",
    "weight": "58kg",
    "warranty": "5-year limited warranty",
    "assembly": "Legs to be fitted"
},
    category_ids: [categories.find(c => c.name === "Extendable Dining Tables")?.id, categories.find(c => c.name === "Tables")?.id].filter((id): id is string => Boolean(id)),
    tag_ids: [tags.find(t => t.value === "bestsellers")?.id, tags.find(t => t.value === "storewide_sale")?.id, tags.find(t => t.value === "small_table_furniture")?.id, tags.find(t => t.value === "small_space_furniture")?.id, tags.find(t => t.value === "all furniture excluding accessories\t")?.id, tags.find(t => t.value === "storewide exclude beige covers")?.id, tags.find(t => t.value === "gss event storewide sale excluding gwp")?.id, tags.find(t => t.value === "all product excluding customisation")?.id, tags.find(t => t.value === "match & save")?.id, tags.find(t => t.value === "all_indoor_dining_table")?.id, tags.find(t => t.value === "all products")?.id, tags.find(t => t.value === "acacia_wood")?.id, tags.find(t => t.value === "style_midcenturymodern")?.id, tags.find(t => t.value === "rounded_furniture")?.id, tags.find(t => t.value === "all_dining_table")?.id, tags.find(t => t.value === "holiday")?.id, tags.find(t => t.value === "web_ar")?.id, tags.find(t => t.value === "coastal")?.id, tags.find(t => t.value === "modern_farmhouse")?.id, tags.find(t => t.value === "extendable_dining_tables")?.id, tags.find(t => t.value === "midcenturymodern")?.id, tags.find(t => t.value === "spring")?.id, tags.find(t => t.value === "bestselling")?.id, tags.find(t => t.value === "2020withcastlery")?.id].filter((id): id is string => Boolean(id)),
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
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1705651498/crusader/variants/T40550099/Seb-Extendable-Dining-Table-Dim-1705651495.png"
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
        metadata: {
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1623727286/crusader/variants/40550099/Seb-Extendable-Dining-Table-Front_2.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1623727285/crusader/variants/40550099/Seb-Extendable-Dining-Table-Front_1.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1623727284/crusader/variants/40550099/Seb-Extendable-Dining-Table-Angle_1.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1623727287/crusader/variants/40550099/Seb-Extendable-Dining-Table-Front_3.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1623727284/crusader/variants/40550099/Seb-Extendable-Dining-Table-Angle_2.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1623727288/crusader/variants/40550099/Seb-Extendable-Dining-Table-Side_2.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1639132600/crusader/variants/40550099/Seb-Extendable-Dining-Table-Set_1.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1624967127/crusader/variants/40550099/Seb-Dining-Table-Set1.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1624967129/crusader/variants/40550099/Seb-Dining-Table-Det5.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1624967129/crusader/variants/40550099/Seb-Dining-Table-Det4.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1680487447/crusader/variants/40550099/Seb-Extendable-Dining-Table-Det_2-1680487444.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1624967128/crusader/variants/40550099/Seb-Dining-Table-Det3.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1631772569/crusader/variants/40550099/Seb-texture.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1705651498/crusader/variants/T40550099/Seb-Extendable-Dining-Table-Dim-1705651495.png"
          ]
},
        prices: [
          {
            amount: 109900,
            currency_code: 'usd',
          },
          {
            amount: 109900,
            currency_code: 'usd',
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
    metadata: {
    "care": "Dawson sofa",
    "filling": "Foam, fibre and feather filled seat; Fibre and feather filled back",
    "cover_type": "Fully removable covers (seat, back cushions and frame)",
    "dimensions": "W228 x D114 x H81cm",
    "weight": "71.8kg",
    "seating_depth": "62cm",
    "seating_height": "46cm",
    "comfort_ratings": {
        "overall_sit_rating": "1",
        "seat_depth_rating": "4",
        "seat_height_rating": "4",
        "seat_softness_rating": "1"
    },
    "warranty": "Frame 10 years; Fabric 1 year; Foam 2 years",
    "assembly": "Fully assembled"
},
    category_ids: [categories.find(c => c.name === "3 Seater Sofas")?.id, categories.find(c => c.name === "Sofa & Armchairs")?.id].filter((id): id is string => Boolean(id)),
    tag_ids: [tags.find(t => t.value === "bestsellers")?.id, tags.find(t => t.value === "storewide_sale")?.id, tags.find(t => t.value === "small_living_room_furniture")?.id, tags.find(t => t.value === "small_space_furniture")?.id, tags.find(t => t.value === "all furniture excluding accessories\t")?.id, tags.find(t => t.value === "storewide exclude beige covers")?.id, tags.find(t => t.value === "gss event storewide sale excluding gwp")?.id, tags.find(t => t.value === "all product excluding customisation")?.id, tags.find(t => t.value === "match & save")?.id, tags.find(t => t.value === "all products")?.id, tags.find(t => t.value === "style_moderncontemporary")?.id, tags.find(t => t.value === "s3_event (do not use)")?.id, tags.find(t => t.value === "all_sofa")?.id].filter((id): id is string => Boolean(id)),
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
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1695372120/crusader/variants/TAS-000227/Dawson-3-Seater-Sofa-Beach-Linen-Dim-1695372118.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1697614106/crusader/variants/AS-000374-NG4002/Dawson-3-Seater-Sofa-Seagull-Front-1697614103.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1697614106/crusader/variants/AS-000374-NG4002/Dawson-3-Seater-Sofa-Seagull-Angle-1697614103.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1697614106/crusader/variants/AS-000374-NG4002/Dawson-3-Seater-Sofa-Seagull-Side-1697614103.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1697614106/crusader/variants/AS-000374-NG4002/Dawson-3-Seater-Sofa-Seagull-Back-1697614103.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1697616548/crusader/variants/AS-000374-NG4002/Dawson-3-Seater-Sofa-With-Armchair-With-Ottoman-Seagull-Square-Set_2-1697616545.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1697614172/crusader/variants/AS-000374-NG4002/Dawson-3-Seater-Sofa-With-Armchair-With-Ottoman-Seagull-Square-Set_5-1697614169.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1702897812/crusader/variants/AS-000374-NG4002/Dawson-3-Seater-Sofa-Seagull-Det_1-1702897808.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1697536241/crusader/variants/54000138-NG4002/Dawson-Swivel-Armchair-Seagull_Copy-1697536238.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1724057632/crusader/variants/AS-000374-NG4002/Sofa-Armrest-Table-Natural-Square-Set_4-1724057630.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1697536313/crusader/variants/54000138-NG4002/Dawson-Ottoman-Seagull-Det_1-1697536311.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1697536242/crusader/variants/54000138-NG4002/Dawson-3-Seater-Sofa-Seagull-Det_2-1697536239.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1697536241/crusader/variants/54000138-NG4002/Dawson-3-Seater-Sofa-Seagull-Det_3-1697536238.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1697536242/crusader/variants/54000138-NG4002/Dawson-3-Seater-Sofa-Seagull-Det_4-1697536239.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1697533968/crusader/variants/TAS-000227/Dawson-3-Seater-Sofa-Seagull-Dim-1697533965.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1750410763/crusader/variants/AS-000374C-TL4003/Dawson-3-Seater-Sofa-Charcoal-Grey-Front-1750410761.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1720667585/crusader/variants/50440775C-TL4003/Charcoal-Grey-Twill_Adams_Owen-1720667583.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1731313238/crusader/variants/AS-000374C-VL4014/Dawson-3-Seater-Sofa-Olive-Gold-Front-1731313235.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1720577374/crusader/variants/AS-000190C-VL4014-SV/Owen-3-Seater-Sofa-Royal-Gold-Det6-1720577372.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1731313222/crusader/variants/AS-000374C-TL4001/Dawson-3-Seater-Sofa-Indigo-Blue-Front-1731313219.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1722476761/crusader/variants/AS-000374C-TL4001/Dawson-Sofa-Indigo-Blue-Campaign-Square-Det_1-1722476759.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1720765488/crusader/variants/AS-000374C-TL4001/Indigo-Blue-Twill_Owen-1720765485.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1731313207/crusader/variants/AS-000374C-TL4002/Dawson-3-Seater-Sofa-Beige-Front-1731313204.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1720765466/crusader/variants/AS-000374C-TL4002/Owen-3-Seater-Sofa-Pearl-Beige-Det6-1720765464.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1731313178/crusader/variants/AS-000374C-PM4002/Dawson-3-Seater-Sofa-Brilliant-White-Front-1731313175.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1720679390/crusader/variants/54000103C-PM4002/Brilliant-White-PlainWeave_Adams_Owen-1720679387.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1730946379/crusader/variants/AS-000374C-PY4001/Dawson-3-Seater-Sofa-Ivory-Front-1730946377.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1722308046/crusader/variants/AS-000189C-PY4001-GD/Ivory-Swatch-Copy_1-1722308043.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1730946413/crusader/variants/AS-000374C-PY4002/Dawson-3-Seater-Sofa-Dove-Grey-Front-1730946410.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1722308132/crusader/variants/AS-000189C-PY4002-GD/Dove-Grey-Swatch-Copy_1-1722308130.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1731313159/crusader/variants/AS-000374C-PM4001/Dawson-3-Seater-Sofa-Smoke-Grey-Front-1731313156.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1722419565/crusader/variants/54000138C-PM4001/Performance-Smoke-Grey__2_-1722419563.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1730946446/crusader/variants/AS-000374C-PY4003/Dawson-3-Seater-Sofa-Moss-Front-1730946444.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1722308164/crusader/variants/AS-000189C-PY4003-BLK/Moss-Swatch-Copy_1-1722308161.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1731313137/crusader/variants/AS-000374C-PT4001/Dawson-3-Seater-Sofa-Creamy-White-Front-1731313134.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1720679601/crusader/variants/54000102C-PT4001/Creamy-White-Twill_Adams_Owen-1720679599.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1730946570/crusader/variants/AS-000374C-PY4004/Dawson-3-Seater-Sofa-Cumin-Front-1730946567.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1722307826/crusader/variants/AS-000189C-PY4004-BLK/Cumin-Swathc-Copy_1-1722307823.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1731313112/crusader/variants/AS-000374C-IN4003/Dawson-3-Seater-Sofa-Ginger-Front-1731313109.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1720679762/crusader/variants/54000102C-IN4003/Marlow_Ginger-1720679759.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1731313073/crusader/variants/AS-000374C-IN4002/Dawson-3-Seater-Sofa-White-Quartz-Front-1731313071.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1720679628/crusader/variants/54000102C-IN4002/White-Quartz_1-1720679625.jpg"
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
        metadata: {
          "cover_type": "Fully removable covers (seat and back cushions, and frame)",
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1634716861/crusader/variants/T50440986-NG4001/Dawson-3-Seater-Sofa-Beach-Linen-Front.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1634716861/crusader/variants/T50440986-NG4001/Dawson-3-Seater-Sofa-Beach-Linen-Angle.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1634716860/crusader/variants/T50440986-NG4001/Dawson-3-Seater-Sofa-Beach-Linen-Side.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1634716879/crusader/variants/T50440986-NG4001/Dawson-3-Seater-Sofa-Beach-Linen-Back.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1640249245/crusader/variants/T50440986-NG4001/Dawson-Sofa-With-Ottoman-Beach-Linen-Square-Set_5.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1706000281/crusader/variants/AS-000374-NG4001/Dawson-3-Seater-Sofa-With-Armchair-With-Ottoman-Seagull-Square-Set_2-1706000280.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1702897677/crusader/variants/AS-000374-NG4001/Dawson-Extended-Sofa-With-Ottoman-Beach-Linen-Set_1-1702897677.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1702897677/crusader/variants/AS-000374-NG4001/Dawson-Swivel-Armchair-Copy-1702897677.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1716861123/crusader/variants/AS-000227-NG4001/Sofa-Armrest-Table-Natural-Square-Set_4-1716861123.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1641546342/crusader/variants/T50440986-NG4001/Dawson-Chaise-Sectional-Sofa-Beach-Linen-Det_1.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1634714309/crusader/variants/54000042-NG4001/Dawson-Sofa-Beach-Linen-Square-Det_2.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1634714194/crusader/variants/54000042-NG4001/Dawson-Sofa-Beach-Linen-Square-Det_4.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1634714178/crusader/variants/54000042-NG4001/Dawson-Sofa-Beach-Linen-Square-Det_8.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1695372120/crusader/variants/TAS-000227/Dawson-3-Seater-Sofa-Beach-Linen-Dim-1695372118.png"
          ]
},
        prices: [
          {
            amount: 189800,
            currency_code: 'usd',
          },
          {
            amount: 189800,
            currency_code: 'usd',
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
        metadata: {
          "cover_type": "Fully removable covers (seat and back cushions, and frame)",
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1697614106/crusader/variants/AS-000374-NG4002/Dawson-3-Seater-Sofa-Seagull-Front-1697614103.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1697614106/crusader/variants/AS-000374-NG4002/Dawson-3-Seater-Sofa-Seagull-Angle-1697614103.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1697614106/crusader/variants/AS-000374-NG4002/Dawson-3-Seater-Sofa-Seagull-Side-1697614103.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1697614106/crusader/variants/AS-000374-NG4002/Dawson-3-Seater-Sofa-Seagull-Back-1697614103.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1697616548/crusader/variants/AS-000374-NG4002/Dawson-3-Seater-Sofa-With-Armchair-With-Ottoman-Seagull-Square-Set_2-1697616545.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1697614172/crusader/variants/AS-000374-NG4002/Dawson-3-Seater-Sofa-With-Armchair-With-Ottoman-Seagull-Square-Set_5-1697614169.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1702897812/crusader/variants/AS-000374-NG4002/Dawson-3-Seater-Sofa-Seagull-Det_1-1702897808.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1697536241/crusader/variants/54000138-NG4002/Dawson-Swivel-Armchair-Seagull_Copy-1697536238.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1724057632/crusader/variants/AS-000374-NG4002/Sofa-Armrest-Table-Natural-Square-Set_4-1724057630.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1697536313/crusader/variants/54000138-NG4002/Dawson-Ottoman-Seagull-Det_1-1697536311.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1697536242/crusader/variants/54000138-NG4002/Dawson-3-Seater-Sofa-Seagull-Det_2-1697536239.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1697536241/crusader/variants/54000138-NG4002/Dawson-3-Seater-Sofa-Seagull-Det_3-1697536238.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1697536242/crusader/variants/54000138-NG4002/Dawson-3-Seater-Sofa-Seagull-Det_4-1697536239.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1697533968/crusader/variants/TAS-000227/Dawson-3-Seater-Sofa-Seagull-Dim-1697533965.png"
          ]
},
        prices: [
          {
            amount: 189800,
            currency_code: 'usd',
          },
          {
            amount: 189800,
            currency_code: 'usd',
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
        metadata: {
          "fabric_composition": "70% Polyester, 30% Acrylic",
          "cancellation": "Customisation—no cancellation",
          "returns": "Customisation—no refund or exchange",
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1750410763/crusader/variants/AS-000374C-TL4003/Dawson-3-Seater-Sofa-Charcoal-Grey-Front-1750410761.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1720667585/crusader/variants/50440775C-TL4003/Charcoal-Grey-Twill_Adams_Owen-1720667583.jpg"
          ]
},
        prices: [
          {
            amount: 211800,
            currency_code: 'usd',
          },
          {
            amount: 211800,
            currency_code: 'usd',
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
        metadata: {
          "fabric_composition": "100% Polyester",
          "cancellation": "Customisation—no cancellation",
          "returns": "Customisation—no refund or exchange",
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1731313238/crusader/variants/AS-000374C-VL4014/Dawson-3-Seater-Sofa-Olive-Gold-Front-1731313235.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1720577374/crusader/variants/AS-000190C-VL4014-SV/Owen-3-Seater-Sofa-Royal-Gold-Det6-1720577372.jpg"
          ]
},
        prices: [
          {
            amount: 205800,
            currency_code: 'usd',
          },
          {
            amount: 205800,
            currency_code: 'usd',
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
        metadata: {
          "fabric_composition": "80% Polyester, 20% Acrylic",
          "cancellation": "Customisation—no cancellation",
          "returns": "Customisation—no refund or exchange",
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1731313222/crusader/variants/AS-000374C-TL4001/Dawson-3-Seater-Sofa-Indigo-Blue-Front-1731313219.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1722476761/crusader/variants/AS-000374C-TL4001/Dawson-Sofa-Indigo-Blue-Campaign-Square-Det_1-1722476759.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1720765488/crusader/variants/AS-000374C-TL4001/Indigo-Blue-Twill_Owen-1720765485.jpg"
          ]
},
        prices: [
          {
            amount: 211800,
            currency_code: 'usd',
          },
          {
            amount: 211800,
            currency_code: 'usd',
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
        metadata: {
          "fabric_composition": "70% Polyester, 30% Acrylic",
          "cancellation": "Customisation—no cancellation",
          "returns": "Customisation—no refund or exchange",
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1731313207/crusader/variants/AS-000374C-TL4002/Dawson-3-Seater-Sofa-Beige-Front-1731313204.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1720765466/crusader/variants/AS-000374C-TL4002/Owen-3-Seater-Sofa-Pearl-Beige-Det6-1720765464.jpg"
          ]
},
        prices: [
          {
            amount: 211800,
            currency_code: 'usd',
          },
          {
            amount: 211800,
            currency_code: 'usd',
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
        metadata: {
          "fabric_composition": "97% Polyester, 3% Acrylic",
          "cancellation": "Customisation—no cancellation",
          "returns": "Customisation—no refund or exchange",
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1731313178/crusader/variants/AS-000374C-PM4002/Dawson-3-Seater-Sofa-Brilliant-White-Front-1731313175.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1720679390/crusader/variants/54000103C-PM4002/Brilliant-White-PlainWeave_Adams_Owen-1720679387.jpg"
          ]
},
        prices: [
          {
            amount: 211800,
            currency_code: 'usd',
          },
          {
            amount: 211800,
            currency_code: 'usd',
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
        metadata: {
          "fabric_composition": "100% Polyester",
          "cancellation": "Customisation—no cancellation",
          "returns": "Customisation—no refund or exchange",
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1730946379/crusader/variants/AS-000374C-PY4001/Dawson-3-Seater-Sofa-Ivory-Front-1730946377.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1722308046/crusader/variants/AS-000189C-PY4001-GD/Ivory-Swatch-Copy_1-1722308043.jpg"
          ]
},
        prices: [
          {
            amount: 211800,
            currency_code: 'usd',
          },
          {
            amount: 211800,
            currency_code: 'usd',
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
        metadata: {
          "fabric_composition": "100% Polyester",
          "cancellation": "Customisation—no cancellation",
          "returns": "Customisation—no refund or exchange",
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1730946413/crusader/variants/AS-000374C-PY4002/Dawson-3-Seater-Sofa-Dove-Grey-Front-1730946410.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1722308132/crusader/variants/AS-000189C-PY4002-GD/Dove-Grey-Swatch-Copy_1-1722308130.jpg"
          ]
},
        prices: [
          {
            amount: 211800,
            currency_code: 'usd',
          },
          {
            amount: 211800,
            currency_code: 'usd',
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
        metadata: {
          "fabric_composition": "97% Polyester, 3% Acrylic",
          "cancellation": "Customisation—no cancellation",
          "returns": "Customisation—no refund or exchange",
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1731313159/crusader/variants/AS-000374C-PM4001/Dawson-3-Seater-Sofa-Smoke-Grey-Front-1731313156.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1722419565/crusader/variants/54000138C-PM4001/Performance-Smoke-Grey__2_-1722419563.jpg"
          ]
},
        prices: [
          {
            amount: 211800,
            currency_code: 'usd',
          },
          {
            amount: 211800,
            currency_code: 'usd',
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
        metadata: {
          "fabric_composition": "100% Polyester",
          "cancellation": "Customisation—no cancellation",
          "returns": "Customisation—no refund or exchange",
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1730946446/crusader/variants/AS-000374C-PY4003/Dawson-3-Seater-Sofa-Moss-Front-1730946444.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1722308164/crusader/variants/AS-000189C-PY4003-BLK/Moss-Swatch-Copy_1-1722308161.jpg"
          ]
},
        prices: [
          {
            amount: 211800,
            currency_code: 'usd',
          },
          {
            amount: 211800,
            currency_code: 'usd',
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
        metadata: {
          "fabric_composition": "80% Polyester, 20% Acrylic",
          "cancellation": "Customisation—no cancellation",
          "returns": "Customisation—no refund or exchange",
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1731313137/crusader/variants/AS-000374C-PT4001/Dawson-3-Seater-Sofa-Creamy-White-Front-1731313134.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1720679601/crusader/variants/54000102C-PT4001/Creamy-White-Twill_Adams_Owen-1720679599.jpg"
          ]
},
        prices: [
          {
            amount: 211800,
            currency_code: 'usd',
          },
          {
            amount: 211800,
            currency_code: 'usd',
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
        metadata: {
          "fabric_composition": "100% Polyester",
          "cancellation": "Customisation—no cancellation",
          "returns": "Customisation—no refund or exchange",
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1730946570/crusader/variants/AS-000374C-PY4004/Dawson-3-Seater-Sofa-Cumin-Front-1730946567.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1722307826/crusader/variants/AS-000189C-PY4004-BLK/Cumin-Swathc-Copy_1-1722307823.jpg"
          ]
},
        prices: [
          {
            amount: 211800,
            currency_code: 'usd',
          },
          {
            amount: 211800,
            currency_code: 'usd',
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
        metadata: {
          "fabric_composition": "100% Polyester",
          "cancellation": "Customisation—no cancellation",
          "returns": "Customisation—no refund or exchange",
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1731313112/crusader/variants/AS-000374C-IN4003/Dawson-3-Seater-Sofa-Ginger-Front-1731313109.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1720679762/crusader/variants/54000102C-IN4003/Marlow_Ginger-1720679759.jpg"
          ]
},
        prices: [
          {
            amount: 217800,
            currency_code: 'usd',
          },
          {
            amount: 217800,
            currency_code: 'usd',
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
        metadata: {
          "fabric_composition": "100% Polyester",
          "cancellation": "Customisation—no cancellation",
          "returns": "Customisation—no refund or exchange",
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1731313073/crusader/variants/AS-000374C-IN4002/Dawson-3-Seater-Sofa-White-Quartz-Front-1731313071.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1720679628/crusader/variants/54000102C-IN4002/White-Quartz_1-1720679625.jpg"
          ]
},
        prices: [
          {
            amount: 217800,
            currency_code: 'usd',
          },
          {
            amount: 217800,
            currency_code: 'usd',
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
    metadata: {
    "material": "Frame: laminated veneer lumber with plywood; Leg: solid rubber wood",
    "care": "Leather sofa, wooden legs",
    "filling": "Foam, fibre and pocket spring filled seat; Fibre filled back; Foam filled frame",
    "cover_type": "Removable back cushion and bolster covers; Fixed seat cushion covers",
    "dimensions": "W204 x D97 x H87cm",
    "weight": "52.5kg",
    "seating_depth": "61cm",
    "seating_height": "49cm",
    "comfort_ratings": {
        "overall_sit_rating": "2",
        "seat_depth_rating": "4",
        "seat_height_rating": "4",
        "seat_softness_rating": "3"
    },
    "warranty": "Frame 10 years; Leather 1 year; Foam 2 years",
    "assembly": "Legs to be fitted"
},
    category_ids: [categories.find(c => c.name === "3 Seater Sofas")?.id, categories.find(c => c.name === "Sofa & Armchairs")?.id].filter((id): id is string => Boolean(id)),
    tag_ids: [tags.find(t => t.value === "storewide_sale")?.id, tags.find(t => t.value === "small_living_room_furniture")?.id, tags.find(t => t.value === "small_space_furniture")?.id, tags.find(t => t.value === "all furniture excluding accessories\t")?.id, tags.find(t => t.value === "storewide exclude beige covers")?.id, tags.find(t => t.value === "gss event storewide sale excluding gwp")?.id, tags.find(t => t.value === "all product excluding customisation")?.id, tags.find(t => t.value === "match & save")?.id, tags.find(t => t.value === "all products")?.id, tags.find(t => t.value === "style_midcenturymodern")?.id, tags.find(t => t.value === "s3_event (do not use)")?.id, tags.find(t => t.value === "all_sofa")?.id, tags.find(t => t.value === "icu_list")?.id, tags.find(t => t.value === "holiday")?.id, tags.find(t => t.value === "midcenturymodern")?.id].filter((id): id is string => Boolean(id)),
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
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1748500364/crusader/variants/T50440750-LE/Madison-3-Seater-Sofa-Caramel-Dim-SG-1748500361.png"
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
        metadata: {
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1631157536/crusader/variants/50440750-LE4016/Madison-3-Seater-Sofa-Caramel-Front.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1631157809/crusader/variants/50440750-LE4016/Madison-3-Seater-Sofa-Caramel-Angle.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1631157921/crusader/variants/50440750-LE4016/Madison-3-Seater-Sofa-Caramel-Side.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1631157930/crusader/variants/50440750-LE4016/Madison-3-Seater-Sofa-Caramel-Back.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1631157511/crusader/variants/50440750-LE4016/Madison-Leather-3-Seater-Sofa-Caramel-Lifestyle-Crop.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1631157610/crusader/variants/50440750-LE4016/Madison-3-Seater-Sofa-Caramel-Square-Set_4.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1716790130/crusader/variants/50440728-LE4016/Owen-Sofa-Headrest-Opal-Beige-Square-Det_10-1716790129.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1680854820/crusader/variants/50440728-LE4016/Madison-Sofa-Lunar-New-Year-Campaign-Square-Set_13-1680854820.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1632991501/crusader/variants/50440750-LE4016/Jonathan-Texture.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1748500364/crusader/variants/T50440750-LE/Madison-3-Seater-Sofa-Caramel-Dim-SG-1748500361.png"
          ]
},
        prices: [
          {
            amount: 199900,
            currency_code: 'usd',
          },
          {
            amount: 199900,
            currency_code: 'usd',
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
    metadata: {
    "care": "Fabric sofa",
    "filling": "Foam, fibre and pocket spring filled seat; Foam and fibre filled back",
    "cover_type": "Fixed",
    "dimensions": "W139 x D100 x H70cm",
    "weight": "31kg",
    "seating_depth": "63cm",
    "seating_height": "41cm",
    "comfort_ratings": {
        "overall_sit_rating": "2",
        "seat_depth_rating": "4",
        "seat_height_rating": "3",
        "seat_softness_rating": "2"
    },
    "warranty": "Frame 10 years; Fabric 1 year; Foam 2 years",
    "assembly": "Fully assembled"
},
    category_ids: [categories.find(c => c.name === "Modular Chaises")?.id, categories.find(c => c.name === "Sofa & Armchairs")?.id].filter((id): id is string => Boolean(id)),
    tag_ids: [tags.find(t => t.value === "bestsellers")?.id, tags.find(t => t.value === "storewide_sale")?.id, tags.find(t => t.value === "all furniture excluding accessories\t")?.id, tags.find(t => t.value === "storewide exclude beige covers")?.id, tags.find(t => t.value === "gss event storewide sale excluding gwp")?.id, tags.find(t => t.value === "all product excluding customisation")?.id, tags.find(t => t.value === "match & save")?.id, tags.find(t => t.value === "all products")?.id, tags.find(t => t.value === "modular_sofas")?.id, tags.find(t => t.value === "style_moderncontemporary")?.id, tags.find(t => t.value === "u_c_shaped_sofa")?.id, tags.find(t => t.value === "all_sofa")?.id].filter((id): id is string => Boolean(id)),
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
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1681977021/crusader/variants/T54000098/Jonathan-Left-Chaise-Sofa-Creamy-White-Dim-1681977019.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1681963448/crusader/variants/54000098-GI4001/Jonathan-Left-Chaise-Sofa-Zenith-Bule-Frone-1681963446.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1681963449/crusader/variants/54000098-GI4001/Jonathan-Left-Chaise-Sofa-Zenith-Bule-Angle-1681963446.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1681963448/crusader/variants/54000098-GI4001/Jonathan-Left-Chaise-Sofa-Zenith-Bule-Side-1681963446.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1681963448/crusader/variants/54000098-GI4001/Jonathan-Left-Chaise-Sofa-Zenith-Bule-Back-1681963446.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1683282413/crusader/variants/54000098-GI4001/Jonathan-Side-Left-Chaise-Sectional-Zenith-Bule-Det_12-1683282410.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1682044396/crusader/variants/54000098-GI4001/Jonathan-Side-Left-Chaise-Sofa-Zenith-Bule-Square-Set_1-1682044393.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1682059011/crusader/variants/54000098-GI4001/Jonathan-Extended-Side-Left-Chaise-Sectional-With-Ottoman-Zenith-Bule-Square-Set_1-1682059009.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1682059031/crusader/variants/54000098-GI4001/Jonathan-Extended-Side-Right-Chaise-Sectional-Zenith-Bule-Det_2-1682059028.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1682043830/crusader/variants/54000098-GI4001/Jonathan-Zenith-Blue-Det_1-1682043827.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1682043829/crusader/variants/54000098-GI4001/Jonathan-Sofa-Zenith-Blue-Det_7-1682043827.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1682043830/crusader/variants/54000098-GI4001/Jonathan-Zenith-Blue-Det_2-1682043827.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1681977075/crusader/variants/T54000098/Jonathan-Left-Chaise-Sofa-Zenith-Bule-Dim-1681977073.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1684220628/crusader/variants/54000098-GI4002/Jonathan-Side-Left-Chaise-Dark-Granite-Front_-1684220626.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1684220628/crusader/variants/54000098-GI4002/Jonathan-Side-Left-Chaise-Dark-Granite-Angle-1684220626.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1684220628/crusader/variants/54000098-GI4002/Jonathan-Side-Left-Chaise-Dark-Granite-Side_-1684220626.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1684220628/crusader/variants/54000098-GI4002/Jonathan-Side-Left-Chaise-Dark-Granite-Back_-1684220626.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1684374964/crusader/variants/54000098-GI4002/Jonathan-Side-Left-Chaise-Sectional-Sofa-Dark-Granite-Square-Det_1-1684374957.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1684375089/crusader/variants/54000098-GI4002/Jonathan-Side-Left-Chaise-Sofa-Dark-Granite-Square-Set_1-1684375086.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1684375089/crusader/variants/54000098-GI4002/Jonathan-Extended-Side-Left-Chaise-Sectional_-Sofa-Drak-Granite-Square-Set_2-1684375086.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1684220647/crusader/variants/54000098-GI4002/Jonathan-Sofa-Dark-Granite-Det_6-1684220644.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1684220647/crusader/variants/54000098-GI4002/Jonathan-Sofa-Dark-Granite-Det_4-1684220645.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1684220647/crusader/variants/54000098-GI4002/Jonathan-Sofa-Dark-Granite-Det_3-1684220645.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1684220647/crusader/variants/54000098-GI4002/Jonathan-Sofa-Dark-Granite-Det_2-1684220644.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1681977051/crusader/variants/T54000098/Jonathan-Side-Left-Chaise-Dark-Granite-Dim_-1681977049.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721015308/crusader/variants/54000094C-TL4003/Jonathan-3-Seater-Sofa-Charcoal-Grey-Front-1721015306.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1720667585/crusader/variants/50440775C-TL4003/Charcoal-Grey-Twill_Adams_Owen-1720667583.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721015288/crusader/variants/54000094C-VL4014/Jonathan-3-Seater-Sofa-Olive-Gold-Front-1721015285.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1720577374/crusader/variants/AS-000190C-VL4014-SV/Owen-3-Seater-Sofa-Royal-Gold-Det6-1720577372.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721015260/crusader/variants/54000094C-TL4001/Jonathan-3-Seater-Sofa-Indigo-Blue-Front-1721015257.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721015260/crusader/variants/54000094C-TL4001/Indigo-Blue-Twill_Owen-1721015257.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721015239/crusader/variants/54000094C-CY4003/Jonathan-3-Seater-Sofa-Light-Blush-Front-1721015236.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721015239/crusader/variants/54000094C-CY4003/Lexi-Bed-Light-Blush-Square-Det_3-1721015236.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721015218/crusader/variants/54000094C-CY4001/Jonathan-3-Seater-Sofa-Frost-White-Front-1721015216.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721015218/crusader/variants/54000094C-CY4001/Frost-White_1-1721015216.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721015191/crusader/variants/54000094C-TL4002/Jonathan-3-Seater-Sofa-Pearl-Beige-Front-1721015189.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721015190/crusader/variants/54000094C-TL4002/Owen-3-Seater-Sofa-Pearl-Beige-Det6-1721015188.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721015170/crusader/variants/54000094C-PM4002/Jonathan-3-Seater-Sofa-Performance-Brilliant-White-Front-1721015168.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1720679390/crusader/variants/54000103C-PM4002/Brilliant-White-PlainWeave_Adams_Owen-1720679387.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721015149/crusader/variants/54000094C-CY4002/Jonathan-3-Seater-Sofa-Nickel-Grey-Front-1721015147.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1722479254/crusader/variants/54000094C-CY4002/Nickel-Grey-1722479251.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721015128/crusader/variants/54000094C-PY4001/Jonathan-3-Seater-Sofa-Ivory-Front-1721015126.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1722308046/crusader/variants/AS-000189C-PY4001-GD/Ivory-Swatch-Copy_1-1722308043.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721015105/crusader/variants/54000094C-PY4002/Jonathan-3-Seater-Sofa-Dove-Grey-Front-1721015102.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1722308132/crusader/variants/AS-000189C-PY4002-GD/Dove-Grey-Swatch-Copy_1-1722308130.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1722419258/crusader/variants/54000094C-PM4001/Jonathan-3-Seater-Sofa-Performance-Smoke-Grey-Front__2_-1722419256.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1722419113/crusader/variants/54000094C-PM4001/Smoke-Grey-PlainWeave_Adams-1722419111.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721015053/crusader/variants/54000094C-PY4003/Jonathan-3-Seater-Sofa-Moss-Front-1721015050.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1722308164/crusader/variants/AS-000189C-PY4003-BLK/Moss-Swatch-Copy_1-1722308161.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721121787/crusader/variants/54000098C-PY4004/Jonathan-3-Seater-Sofa-Cumin-Front-1721121785.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1722307826/crusader/variants/AS-000189C-PY4004-BLK/Cumin-Swathc-Copy_1-1722307823.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721014828/crusader/variants/54000094C-IN4003/Jonathan-3-Seater-Sofa-Ginger-Front-1721014825.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1720679762/crusader/variants/54000102C-IN4003/Marlow_Ginger-1720679759.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721014807/crusader/variants/54000094C-IN4002/Jonathan-3-Seater-Sofa-White-Quartz-Front-1721014804.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1720679628/crusader/variants/54000102C-IN4002/White-Quartz_1-1720679625.jpg"
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
        metadata: {
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1684203626/crusader/variants/54000098-PT4001/Jonathan-Left-Chaise-Sofa-Creamy-White-Front-1684203624.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1684203670/crusader/variants/54000098-PT4001/Jonathan-Left-Chaise-Sofa-Creamy-White-Angle-1684203668.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1681976227/crusader/variants/54000098-PT4001/Jonathan-Left-Chaise-Sofa-Creamy-White-Side-1681976224.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1684203587/crusader/variants/54000098-PT4001/Jonathan-Left-Chaise-Sofa-Creamy-White-Back-1684203584.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1682046879/crusader/variants/54000098-PT4001/Jonathan-Extended-Side-Left-Chaise-Sofa-Creamy-White-Square-Det_2-1682046877.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1682046879/crusader/variants/54000098-PT4001/Jonathan-Side-Chaise-Sofa-Creamy-White-Square-Set_1_1-1682046877.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1683276724/crusader/variants/54000098-PT4001/Jonathan-Extended-Side-Left-Chaise-Sectional-Sofa-Creamy-White-Square-Set_4-1683276721.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1681976279/crusader/variants/54000098-PT4001/Jonathan-Side-Right-Chaise-Sofa-Creamy-White-Det_1-1681976276.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1683276849/crusader/variants/54000098-PT4001/Jonathan-Side-Right-Chaise-Sofa-Creamy-White-Det_2-1683276847.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1681976278/crusader/variants/54000098-PT4001/Jonathan-Side-Right-Chaise-Sofa-Creamy-White-Det_5-1681976276.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1681976408/crusader/variants/54000098-PT4001/Jonathan-Side-Right-Chaise-Sofa-Creamy-White-Det_6-1681976405.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1681977021/crusader/variants/T54000098/Jonathan-Left-Chaise-Sofa-Creamy-White-Dim-1681977019.png"
          ]
},
        prices: [
          {
            amount: 94900,
            currency_code: 'usd',
          },
          {
            amount: 94900,
            currency_code: 'usd',
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
        metadata: {
          "fabric_composition": "91% Polyester, 4% Nylon, 5% Cotton",
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1681963448/crusader/variants/54000098-GI4001/Jonathan-Left-Chaise-Sofa-Zenith-Bule-Frone-1681963446.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1681963449/crusader/variants/54000098-GI4001/Jonathan-Left-Chaise-Sofa-Zenith-Bule-Angle-1681963446.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1681963448/crusader/variants/54000098-GI4001/Jonathan-Left-Chaise-Sofa-Zenith-Bule-Side-1681963446.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1681963448/crusader/variants/54000098-GI4001/Jonathan-Left-Chaise-Sofa-Zenith-Bule-Back-1681963446.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1683282413/crusader/variants/54000098-GI4001/Jonathan-Side-Left-Chaise-Sectional-Zenith-Bule-Det_12-1683282410.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1682044396/crusader/variants/54000098-GI4001/Jonathan-Side-Left-Chaise-Sofa-Zenith-Bule-Square-Set_1-1682044393.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1682059011/crusader/variants/54000098-GI4001/Jonathan-Extended-Side-Left-Chaise-Sectional-With-Ottoman-Zenith-Bule-Square-Set_1-1682059009.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1682059031/crusader/variants/54000098-GI4001/Jonathan-Extended-Side-Right-Chaise-Sectional-Zenith-Bule-Det_2-1682059028.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1682043830/crusader/variants/54000098-GI4001/Jonathan-Zenith-Blue-Det_1-1682043827.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1682043829/crusader/variants/54000098-GI4001/Jonathan-Sofa-Zenith-Blue-Det_7-1682043827.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1682043830/crusader/variants/54000098-GI4001/Jonathan-Zenith-Blue-Det_2-1682043827.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1681977075/crusader/variants/T54000098/Jonathan-Left-Chaise-Sofa-Zenith-Bule-Dim-1681977073.png"
          ]
},
        prices: [
          {
            amount: 89900,
            currency_code: 'usd',
          },
          {
            amount: 89900,
            currency_code: 'usd',
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
        metadata: {
          "fabric_composition": "91% Polyester, 4% Nylon, 5% Cotton",
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1684220628/crusader/variants/54000098-GI4002/Jonathan-Side-Left-Chaise-Dark-Granite-Front_-1684220626.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1684220628/crusader/variants/54000098-GI4002/Jonathan-Side-Left-Chaise-Dark-Granite-Angle-1684220626.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1684220628/crusader/variants/54000098-GI4002/Jonathan-Side-Left-Chaise-Dark-Granite-Side_-1684220626.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1684220628/crusader/variants/54000098-GI4002/Jonathan-Side-Left-Chaise-Dark-Granite-Back_-1684220626.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1684374964/crusader/variants/54000098-GI4002/Jonathan-Side-Left-Chaise-Sectional-Sofa-Dark-Granite-Square-Det_1-1684374957.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1684375089/crusader/variants/54000098-GI4002/Jonathan-Side-Left-Chaise-Sofa-Dark-Granite-Square-Set_1-1684375086.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1684375089/crusader/variants/54000098-GI4002/Jonathan-Extended-Side-Left-Chaise-Sectional_-Sofa-Drak-Granite-Square-Set_2-1684375086.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1684220647/crusader/variants/54000098-GI4002/Jonathan-Sofa-Dark-Granite-Det_6-1684220644.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1684220647/crusader/variants/54000098-GI4002/Jonathan-Sofa-Dark-Granite-Det_4-1684220645.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1684220647/crusader/variants/54000098-GI4002/Jonathan-Sofa-Dark-Granite-Det_3-1684220645.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1684220647/crusader/variants/54000098-GI4002/Jonathan-Sofa-Dark-Granite-Det_2-1684220644.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1681977051/crusader/variants/T54000098/Jonathan-Side-Left-Chaise-Dark-Granite-Dim_-1681977049.png"
          ]
},
        prices: [
          {
            amount: 89900,
            currency_code: 'usd',
          },
          {
            amount: 89900,
            currency_code: 'usd',
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
        metadata: {
          "fabric_composition": "70% Polyester, 30% Acrylic",
          "cancellation": "Customisation—no cancellation",
          "returns": "Customisation—no refund or exchange",
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721015308/crusader/variants/54000094C-TL4003/Jonathan-3-Seater-Sofa-Charcoal-Grey-Front-1721015306.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1720667585/crusader/variants/50440775C-TL4003/Charcoal-Grey-Twill_Adams_Owen-1720667583.jpg"
          ]
},
        prices: [
          {
            amount: 99900,
            currency_code: 'usd',
          },
          {
            amount: 99900,
            currency_code: 'usd',
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
        metadata: {
          "fabric_composition": "100% Polyester",
          "cancellation": "Customisation—no cancellation",
          "returns": "Customisation—no refund or exchange",
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721015288/crusader/variants/54000094C-VL4014/Jonathan-3-Seater-Sofa-Olive-Gold-Front-1721015285.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1720577374/crusader/variants/AS-000190C-VL4014-SV/Owen-3-Seater-Sofa-Royal-Gold-Det6-1720577372.jpg"
          ]
},
        prices: [
          {
            amount: 96900,
            currency_code: 'usd',
          },
          {
            amount: 96900,
            currency_code: 'usd',
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
        metadata: {
          "fabric_composition": "80% Polyester, 20% Acrylic",
          "cancellation": "Customisation—no cancellation",
          "returns": "Customisation—no refund or exchange",
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721015260/crusader/variants/54000094C-TL4001/Jonathan-3-Seater-Sofa-Indigo-Blue-Front-1721015257.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721015260/crusader/variants/54000094C-TL4001/Indigo-Blue-Twill_Owen-1721015257.jpg"
          ]
},
        prices: [
          {
            amount: 99900,
            currency_code: 'usd',
          },
          {
            amount: 99900,
            currency_code: 'usd',
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
        metadata: {
          "fabric_composition": "100% Polyester",
          "cancellation": "Customisation—no cancellation",
          "returns": "Customisation—no refund or exchange",
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721015239/crusader/variants/54000094C-CY4003/Jonathan-3-Seater-Sofa-Light-Blush-Front-1721015236.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721015239/crusader/variants/54000094C-CY4003/Lexi-Bed-Light-Blush-Square-Det_3-1721015236.jpg"
          ]
},
        prices: [
          {
            amount: 99900,
            currency_code: 'usd',
          },
          {
            amount: 99900,
            currency_code: 'usd',
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
        metadata: {
          "fabric_composition": "100% Polyester",
          "cancellation": "Customisation—no cancellation",
          "returns": "Customisation—no refund or exchange",
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721015218/crusader/variants/54000094C-CY4001/Jonathan-3-Seater-Sofa-Frost-White-Front-1721015216.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721015218/crusader/variants/54000094C-CY4001/Frost-White_1-1721015216.jpg"
          ]
},
        prices: [
          {
            amount: 99900,
            currency_code: 'usd',
          },
          {
            amount: 99900,
            currency_code: 'usd',
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
        metadata: {
          "fabric_composition": "70% Polyester, 30% Acrylic",
          "cancellation": "Customisation—no cancellation",
          "returns": "Customisation—no refund or exchange",
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721015191/crusader/variants/54000094C-TL4002/Jonathan-3-Seater-Sofa-Pearl-Beige-Front-1721015189.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721015190/crusader/variants/54000094C-TL4002/Owen-3-Seater-Sofa-Pearl-Beige-Det6-1721015188.jpg"
          ]
},
        prices: [
          {
            amount: 99900,
            currency_code: 'usd',
          },
          {
            amount: 99900,
            currency_code: 'usd',
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
        metadata: {
          "fabric_composition": "97% Polyester, 3% Acrylic",
          "cancellation": "Customisation—no cancellation",
          "returns": "Customisation—no refund or exchange",
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721015170/crusader/variants/54000094C-PM4002/Jonathan-3-Seater-Sofa-Performance-Brilliant-White-Front-1721015168.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1720679390/crusader/variants/54000103C-PM4002/Brilliant-White-PlainWeave_Adams_Owen-1720679387.jpg"
          ]
},
        prices: [
          {
            amount: 99900,
            currency_code: 'usd',
          },
          {
            amount: 99900,
            currency_code: 'usd',
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
        metadata: {
          "fabric_composition": "100% Polyester",
          "cancellation": "Customisation—no cancellation",
          "returns": "Customisation—no refund or exchange",
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721015149/crusader/variants/54000094C-CY4002/Jonathan-3-Seater-Sofa-Nickel-Grey-Front-1721015147.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1722479254/crusader/variants/54000094C-CY4002/Nickel-Grey-1722479251.jpg"
          ]
},
        prices: [
          {
            amount: 99900,
            currency_code: 'usd',
          },
          {
            amount: 99900,
            currency_code: 'usd',
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
        metadata: {
          "fabric_composition": "100% Polyester",
          "cancellation": "Customisation—no cancellation",
          "returns": "Customisation—no refund or exchange",
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721015128/crusader/variants/54000094C-PY4001/Jonathan-3-Seater-Sofa-Ivory-Front-1721015126.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1722308046/crusader/variants/AS-000189C-PY4001-GD/Ivory-Swatch-Copy_1-1722308043.jpg"
          ]
},
        prices: [
          {
            amount: 99900,
            currency_code: 'usd',
          },
          {
            amount: 99900,
            currency_code: 'usd',
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
        metadata: {
          "fabric_composition": "100% Polyester",
          "cancellation": "Customisation—no cancellation",
          "returns": "Customisation—no refund or exchange",
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721015105/crusader/variants/54000094C-PY4002/Jonathan-3-Seater-Sofa-Dove-Grey-Front-1721015102.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1722308132/crusader/variants/AS-000189C-PY4002-GD/Dove-Grey-Swatch-Copy_1-1722308130.jpg"
          ]
},
        prices: [
          {
            amount: 99900,
            currency_code: 'usd',
          },
          {
            amount: 99900,
            currency_code: 'usd',
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
        metadata: {
          "fabric_composition": "97% Polyester, 3% Acrylic",
          "cancellation": "Customisation—no cancellation",
          "returns": "Customisation—no refund or exchange",
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1722419258/crusader/variants/54000094C-PM4001/Jonathan-3-Seater-Sofa-Performance-Smoke-Grey-Front__2_-1722419256.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1722419113/crusader/variants/54000094C-PM4001/Smoke-Grey-PlainWeave_Adams-1722419111.jpg"
          ]
},
        prices: [
          {
            amount: 99900,
            currency_code: 'usd',
          },
          {
            amount: 99900,
            currency_code: 'usd',
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
        metadata: {
          "fabric_composition": "100% Polyester",
          "cancellation": "Customisation—no cancellation",
          "returns": "Customisation—no refund or exchange",
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721015053/crusader/variants/54000094C-PY4003/Jonathan-3-Seater-Sofa-Moss-Front-1721015050.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1722308164/crusader/variants/AS-000189C-PY4003-BLK/Moss-Swatch-Copy_1-1722308161.jpg"
          ]
},
        prices: [
          {
            amount: 99900,
            currency_code: 'usd',
          },
          {
            amount: 99900,
            currency_code: 'usd',
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
        metadata: {
          "fabric_composition": "100% Polyester",
          "cancellation": "Customisation—no cancellation",
          "returns": "Customisation—no refund or exchange",
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721121787/crusader/variants/54000098C-PY4004/Jonathan-3-Seater-Sofa-Cumin-Front-1721121785.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1722307826/crusader/variants/AS-000189C-PY4004-BLK/Cumin-Swathc-Copy_1-1722307823.jpg"
          ]
},
        prices: [
          {
            amount: 99900,
            currency_code: 'usd',
          },
          {
            amount: 99900,
            currency_code: 'usd',
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
        metadata: {
          "fabric_composition": "100% Polyester",
          "cancellation": "Customisation—no cancellation",
          "returns": "Customisation—no refund or exchange",
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721014828/crusader/variants/54000094C-IN4003/Jonathan-3-Seater-Sofa-Ginger-Front-1721014825.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1720679762/crusader/variants/54000102C-IN4003/Marlow_Ginger-1720679759.jpg"
          ]
},
        prices: [
          {
            amount: 102900,
            currency_code: 'usd',
          },
          {
            amount: 102900,
            currency_code: 'usd',
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
        metadata: {
          "fabric_composition": "100% Polyester",
          "cancellation": "Customisation—no cancellation",
          "returns": "Customisation—no refund or exchange",
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721014807/crusader/variants/54000094C-IN4002/Jonathan-3-Seater-Sofa-White-Quartz-Front-1721014804.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1720679628/crusader/variants/54000102C-IN4002/White-Quartz_1-1720679625.jpg"
          ]
},
        prices: [
          {
            amount: 102900,
            currency_code: 'usd',
          },
          {
            amount: 102900,
            currency_code: 'usd',
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
    metadata: {
    "material": "Cushion: top grain leather; Frame: engineered wood with oak veneer",
    "care": "Leather seating",
    "filling": "PU foam and polyester",
    "dimensions": "W150 x D41 x H51.5cm",
    "weight": "25.4kg",
    "seating_depth": "41cm",
    "seating_height": "45cm",
    "warranty": "10-year limited warranty",
    "assembly": "Legs to be fitted"
},
    category_ids: [categories.find(c => c.name === "Chairs & Benches")?.id, categories.find(c => c.name === "Dining Benches")?.id].filter((id): id is string => Boolean(id)),
    tag_ids: [tags.find(t => t.value === "bestsellers")?.id, tags.find(t => t.value === "storewide_sale")?.id, tags.find(t => t.value === "all furniture excluding accessories\t")?.id, tags.find(t => t.value === "storewide exclude beige covers")?.id, tags.find(t => t.value === "gss event storewide sale excluding gwp")?.id, tags.find(t => t.value === "all product excluding customisation")?.id, tags.find(t => t.value === "match & save")?.id, tags.find(t => t.value === "all products")?.id, tags.find(t => t.value === "style_moderncontemporary")?.id, tags.find(t => t.value === "new_arrivals")?.id, tags.find(t => t.value === "s1_2023_skus")?.id].filter((id): id is string => Boolean(id)),
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
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1677038062/crusader/variants/T50441109/Sloane-Dining-Bench-150cm-Grey-Oak-Dim-1677038060.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1679562782/crusader/variants/T504411010-LE4016/Sloane-Dining-Bench-180cm-Grey-Oak-With-Leather-Cushion-Angle-1679562780.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1679562782/crusader/variants/T504411010-LE4016/Sloane-Dining-Bench-180cm-Grey-Oak-With-Leather-Cushion-Front-1679562780.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1679562782/crusader/variants/T504411010-LE4016/Sloane-Dining-Bench-180cm-Grey-Oak-With-Leather-Cushion-Side-1679562780.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1679562782/crusader/variants/T504411010-LE4016/Sloane-Dining-Bench-180cm-Grey-Oak-Angle-1679562780.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1679562876/crusader/variants/T504411010-LE4016/Sloane-Dining-Bench-180cm-Grey-Oak-Side-1679562874.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1678699707/crusader/variants/T504411010-LE4016/Sloane-Dining-Bench-Square-Set_1-1678699705.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1678700026/crusader/variants/T504411010-LE4016/Sloane-Dining-Bench-Grey-Oak-Det_5-1678700023.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1677038062/crusader/variants/T50441109/Sloane-Dining-Bench-180cm-Grey-Oak-Dim-1677038060.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710500786/crusader/variants/50520005/Sloane-Dining-Bench-150cm-Grey-Oak-Front-1710500784.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710500804/crusader/variants/50520005/Sloane-Dining-Table-With-Dining-Bench-With-4-Cane-Chair-with-Armrest-Dune-Grey-Oak-Set_3-1710500801.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710927506/crusader/variants/TAS-000297/Sloane-Dining-Bench-150cm-Grey-Oak-Dim-1710927504.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710500848/crusader/variants/50520006/Sloane-Dining-Bench-180cm-Grey-Oak-Front-1710500846.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710500849/crusader/variants/50520006/Sloane-Dining-Table-With-Dining-Bench-With-4-Cane-Chair-with-Armrest-Dune-Grey-Oak-Set_3-1710500846.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710927506/crusader/variants/TAS-000297/Sloane-Dining-Bench-180cm-Grey-Oak-Dim-1710927504.png"
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
        metadata: {
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1678698648/crusader/variants/50520005/Sloane-Dining-Bench-150cm-Grey-Oak-With-Leather-Cushion-Angle-1678698646.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1678698647/crusader/variants/50520005/Sloane-Dining-Bench-150cm-Grey-Oak-With-Leather-Cushion-Front-1678698645.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1678698647/crusader/variants/50520005/Sloane-Dining-Bench-150cm-Grey-Oak-With-Leather-Cushion-Side-1678698645.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1678698647/crusader/variants/50520005/Sloane-Dining-Bench-150cm-Grey-Oak-Angle-1678698645.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1678698647/crusader/variants/50520005/Sloane-Dining-Bench-150cm-Grey-Oak-Side-1678698645.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1678698986/crusader/variants/50520005/Sloane-Dining-Bench-Square-Set_2-1678698984.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1678699006/crusader/variants/50520005/Sloane-Dining-Table-With-Dining-Bench-With-4-Cane-and-Leather-Chair-with-Armrest-Caramel-Black-Square-Set_3-1678699004.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1678699742/crusader/variants/T50441109-LE4016/Sloane-Dining-Bench-Square-Set_1-1678699740.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1678699069/crusader/variants/50520005/Sloane-Dining-Bench-Grey-Oak-Det_2-1678699067.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1678699069/crusader/variants/50520005/Sloane-Dining-Bench-Grey-Oak-Det_1-1678699067.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1678699069/crusader/variants/50520005/Sloane-Dining-Bench-Grey-Oak-Det_4-1678699067.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1678699345/crusader/variants/T50441109-LE4016/Sloane-Dining-Bench-Grey-Oak-Det_5-1678699343.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1677038062/crusader/variants/T50441109/Sloane-Dining-Bench-150cm-Grey-Oak-Dim-1677038060.png"
          ]
},
        prices: [
          {
            amount: 64900,
            currency_code: 'usd',
          },
          {
            amount: 64900,
            currency_code: 'usd',
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
        metadata: {
          "general_dimensions": "W180 x D41 x H51.5cm",
          "product_weight": "28.3kg",
          "max_bearing_support": "3 x 130kg",
          "seatable_width": "180cm",
          "packaging_dimensions": "2 boxes",
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1679562782/crusader/variants/T504411010-LE4016/Sloane-Dining-Bench-180cm-Grey-Oak-With-Leather-Cushion-Angle-1679562780.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1679562782/crusader/variants/T504411010-LE4016/Sloane-Dining-Bench-180cm-Grey-Oak-With-Leather-Cushion-Front-1679562780.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1679562782/crusader/variants/T504411010-LE4016/Sloane-Dining-Bench-180cm-Grey-Oak-With-Leather-Cushion-Side-1679562780.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1679562782/crusader/variants/T504411010-LE4016/Sloane-Dining-Bench-180cm-Grey-Oak-Angle-1679562780.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1679562876/crusader/variants/T504411010-LE4016/Sloane-Dining-Bench-180cm-Grey-Oak-Side-1679562874.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1678698986/crusader/variants/50520005/Sloane-Dining-Bench-Square-Set_2-1678698984.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1678699006/crusader/variants/50520005/Sloane-Dining-Table-With-Dining-Bench-With-4-Cane-and-Leather-Chair-with-Armrest-Caramel-Black-Square-Set_3-1678699004.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1678699707/crusader/variants/T504411010-LE4016/Sloane-Dining-Bench-Square-Set_1-1678699705.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1678699069/crusader/variants/50520005/Sloane-Dining-Bench-Grey-Oak-Det_2-1678699067.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1678699069/crusader/variants/50520005/Sloane-Dining-Bench-Grey-Oak-Det_1-1678699067.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1678699069/crusader/variants/50520005/Sloane-Dining-Bench-Grey-Oak-Det_4-1678699067.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1678700026/crusader/variants/T504411010-LE4016/Sloane-Dining-Bench-Grey-Oak-Det_5-1678700023.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1677038062/crusader/variants/T50441109/Sloane-Dining-Bench-180cm-Grey-Oak-Dim-1677038060.png"
          ]
},
        prices: [
          {
            amount: 74900,
            currency_code: 'usd',
          },
          {
            amount: 74900,
            currency_code: 'usd',
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
        metadata: {
          "general_dimensions": "W150 x D39.5 x H45cm",
          "product_weight": "22.8kg",
          "packaging_dimensions": "1 box",
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1678698647/crusader/variants/50520005/Sloane-Dining-Bench-150cm-Grey-Oak-Angle-1678698645.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710500786/crusader/variants/50520005/Sloane-Dining-Bench-150cm-Grey-Oak-Front-1710500784.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1678698647/crusader/variants/50520005/Sloane-Dining-Bench-150cm-Grey-Oak-Side-1678698645.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1678699742/crusader/variants/T50441109-LE4016/Sloane-Dining-Bench-Square-Set_1-1678699740.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710500804/crusader/variants/50520005/Sloane-Dining-Table-With-Dining-Bench-With-4-Cane-Chair-with-Armrest-Dune-Grey-Oak-Set_3-1710500801.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1678699069/crusader/variants/50520005/Sloane-Dining-Bench-Grey-Oak-Det_2-1678699067.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1678699345/crusader/variants/T50441109-LE4016/Sloane-Dining-Bench-Grey-Oak-Det_5-1678699343.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710927506/crusader/variants/TAS-000297/Sloane-Dining-Bench-150cm-Grey-Oak-Dim-1710927504.png"
          ]
},
        prices: [
          {
            amount: 49900,
            currency_code: 'usd',
          },
          {
            amount: 49900,
            currency_code: 'usd',
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
        metadata: {
          "general_dimensions": "W180 x D39.5 x H45cm",
          "product_weight": "25.2kg",
          "packaging_dimensions": "1 box",
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1679562782/crusader/variants/T504411010-LE4016/Sloane-Dining-Bench-180cm-Grey-Oak-Angle-1679562780.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710500848/crusader/variants/50520006/Sloane-Dining-Bench-180cm-Grey-Oak-Front-1710500846.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1679562876/crusader/variants/T504411010-LE4016/Sloane-Dining-Bench-180cm-Grey-Oak-Side-1679562874.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1678699707/crusader/variants/T504411010-LE4016/Sloane-Dining-Bench-Square-Set_1-1678699705.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710500849/crusader/variants/50520006/Sloane-Dining-Table-With-Dining-Bench-With-4-Cane-Chair-with-Armrest-Dune-Grey-Oak-Set_3-1710500846.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1678699069/crusader/variants/50520005/Sloane-Dining-Bench-Grey-Oak-Det_2-1678699067.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1678700026/crusader/variants/T504411010-LE4016/Sloane-Dining-Bench-Grey-Oak-Det_5-1678700023.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710927506/crusader/variants/TAS-000297/Sloane-Dining-Bench-180cm-Grey-Oak-Dim-1710927504.png"
          ]
},
        prices: [
          {
            amount: 54900,
            currency_code: 'usd',
          },
          {
            amount: 54900,
            currency_code: 'usd',
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
    metadata: {
    "care": "Fabric sofa",
    "filling": "Foam, fibre and pocket spring filled seat; Foam and fibre filled back",
    "cover_type": "Fixed",
    "dimensions": "W139 x D100 x H70cm",
    "weight": "31kg",
    "seating_depth": "63cm",
    "seating_height": "41cm",
    "comfort_ratings": {
        "overall_sit_rating": "2",
        "seat_depth_rating": "4",
        "seat_height_rating": "3",
        "seat_softness_rating": "2"
    },
    "warranty": "Frame 10 years; Fabric 1 year; Foam 2 years",
    "assembly": "Fully assembled"
},
    category_ids: [categories.find(c => c.name === "Modular Chaises")?.id, categories.find(c => c.name === "Sofa & Armchairs")?.id].filter((id): id is string => Boolean(id)),
    tag_ids: [tags.find(t => t.value === "storewide_sale")?.id, tags.find(t => t.value === "all furniture excluding accessories\t")?.id, tags.find(t => t.value === "storewide exclude beige covers")?.id, tags.find(t => t.value === "gss event storewide sale excluding gwp")?.id, tags.find(t => t.value === "all product excluding customisation")?.id, tags.find(t => t.value === "match & save")?.id, tags.find(t => t.value === "all products")?.id, tags.find(t => t.value === "modular_sofas")?.id, tags.find(t => t.value === "style_moderncontemporary")?.id, tags.find(t => t.value === "all_sofa")?.id].filter((id): id is string => Boolean(id)),
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
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1681977149/crusader/variants/T54000099/Jonathan-Right-Chaise-Sofa-Creamy-White-Dim-1681977147.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1681976035/crusader/variants/54000099-GI4001/Jonathan-Right-Chaise-Sofa-Zenith-Bule-Frone-1681976032.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1681976034/crusader/variants/54000099-GI4001/Jonathan-Right-Chaise-Sofa-Zenith-Bule-Angle-1681976032.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1681976035/crusader/variants/54000099-GI4001/Jonathan-Right-Chaise-Sofa-Zenith-Bule-Side-1681976032.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1681976035/crusader/variants/54000099-GI4001/Jonathan-Right-Chaise-Sofa-Zenith-Bule-Back-1681976032.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1683282433/crusader/variants/54000099-GI4001/Jonathan-Side-Right-Chaise-Sectional-Zenith-Bule-Det_12-1683282430.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1682058041/crusader/variants/54000099-GI4001/Jonathan-Side-Right-Chaise-Sofa-Zenith-Bule-Square-Set_1-1682058038.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1682058229/crusader/variants/54000099-GI4001/Jonathan-Extended-Side-Right-Chaise-Sectional-With-Ottoman-Zenith-Bule-Square-Set_1-1682058227.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1682058076/crusader/variants/54000099-GI4001/Jonathan-Extended-Side-Right-Chaise-Sectional-Zenith-Bule-Det_2-1682058073.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1682047531/crusader/variants/54000099-GI4001/Jonathan-Zenith-Blue-Det_1-1682047528.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1682047530/crusader/variants/54000099-GI4001/Jonathan-Sofa-Zenith-Blue-Det_7-1682047528.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1682047530/crusader/variants/54000099-GI4001/Jonathan-Zenith-Blue-Det_2-1682047528.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1681977130/crusader/variants/T54000099/Jonathan-Right-Chaise-Sofa-Zenith-Bule-Dim-1681977127.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721015308/crusader/variants/54000094C-TL4003/Jonathan-3-Seater-Sofa-Charcoal-Grey-Front-1721015306.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1720667585/crusader/variants/50440775C-TL4003/Charcoal-Grey-Twill_Adams_Owen-1720667583.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721015288/crusader/variants/54000094C-VL4014/Jonathan-3-Seater-Sofa-Olive-Gold-Front-1721015285.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1720577374/crusader/variants/AS-000190C-VL4014-SV/Owen-3-Seater-Sofa-Royal-Gold-Det6-1720577372.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721015260/crusader/variants/54000094C-TL4001/Jonathan-3-Seater-Sofa-Indigo-Blue-Front-1721015257.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721015260/crusader/variants/54000094C-TL4001/Indigo-Blue-Twill_Owen-1721015257.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721015239/crusader/variants/54000094C-CY4003/Jonathan-3-Seater-Sofa-Light-Blush-Front-1721015236.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721015239/crusader/variants/54000094C-CY4003/Lexi-Bed-Light-Blush-Square-Det_3-1721015236.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721015218/crusader/variants/54000094C-CY4001/Jonathan-3-Seater-Sofa-Frost-White-Front-1721015216.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721015218/crusader/variants/54000094C-CY4001/Frost-White_1-1721015216.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721015191/crusader/variants/54000094C-TL4002/Jonathan-3-Seater-Sofa-Pearl-Beige-Front-1721015189.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721015190/crusader/variants/54000094C-TL4002/Owen-3-Seater-Sofa-Pearl-Beige-Det6-1721015188.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721015170/crusader/variants/54000094C-PM4002/Jonathan-3-Seater-Sofa-Performance-Brilliant-White-Front-1721015168.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1720679390/crusader/variants/54000103C-PM4002/Brilliant-White-PlainWeave_Adams_Owen-1720679387.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721015149/crusader/variants/54000094C-CY4002/Jonathan-3-Seater-Sofa-Nickel-Grey-Front-1721015147.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1722479254/crusader/variants/54000094C-CY4002/Nickel-Grey-1722479251.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721015128/crusader/variants/54000094C-PY4001/Jonathan-3-Seater-Sofa-Ivory-Front-1721015126.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1722308046/crusader/variants/AS-000189C-PY4001-GD/Ivory-Swatch-Copy_1-1722308043.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721015105/crusader/variants/54000094C-PY4002/Jonathan-3-Seater-Sofa-Dove-Grey-Front-1721015102.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1722308132/crusader/variants/AS-000189C-PY4002-GD/Dove-Grey-Swatch-Copy_1-1722308130.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1722419258/crusader/variants/54000094C-PM4001/Jonathan-3-Seater-Sofa-Performance-Smoke-Grey-Front__2_-1722419256.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1722419113/crusader/variants/54000094C-PM4001/Smoke-Grey-PlainWeave_Adams-1722419111.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721015053/crusader/variants/54000094C-PY4003/Jonathan-3-Seater-Sofa-Moss-Front-1721015050.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1722308164/crusader/variants/AS-000189C-PY4003-BLK/Moss-Swatch-Copy_1-1722308161.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721121746/crusader/variants/54000099C-PY4004/Jonathan-3-Seater-Sofa-Cumin-Front-1721121743.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1722307826/crusader/variants/AS-000189C-PY4004-BLK/Cumin-Swathc-Copy_1-1722307823.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721014828/crusader/variants/54000094C-IN4003/Jonathan-3-Seater-Sofa-Ginger-Front-1721014825.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1720679762/crusader/variants/54000102C-IN4003/Marlow_Ginger-1720679759.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721014807/crusader/variants/54000094C-IN4002/Jonathan-3-Seater-Sofa-White-Quartz-Front-1721014804.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1720679628/crusader/variants/54000102C-IN4002/White-Quartz_1-1720679625.jpg"
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
        metadata: {
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1684203750/crusader/variants/54000099-PT4001/Jonathan-Right-Chaise-Sofa-Creamy-White-Front-1684203748.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1684203750/crusader/variants/54000099-PT4001/Jonathan-Right-Chaise-Sofa-Creamy-White-Angle-1684203748.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1684203750/crusader/variants/54000099-PT4001/Jonathan-Right-Chaise-Sofa-Creamy-White-Side-1684203748.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1684203750/crusader/variants/54000099-PT4001/Jonathan-Right-Chaise-Sofa-Creamy-White-Back-1684203748.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1681976653/crusader/variants/54000099-PT4001/Jonathan-Extended-Side-Right-Chaise-Sofa-Creamy-White-Square-Det_2-1681976650.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1681976792/crusader/variants/54000099-PT4001/Jonathan-Side-Chaise-Sofa-Creamy-White-Square-Set_1-1681976789.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1681976824/crusader/variants/54000099-PT4001/Jonathan-Extended-Side-Right-Chaise-Sectional-Sofa-Creamy-White-Square-Set_4-1681976821.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1681976605/crusader/variants/54000099-PT4001/Jonathan-Side-Right-Chaise-Sofa-Creamy-White-Det_1-1681976602.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1683276890/crusader/variants/54000099-PT4001/Jonathan-Side-Right-Chaise-Sofa-Creamy-White-Det_2-1683276888.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1681976605/crusader/variants/54000099-PT4001/Jonathan-Side-Right-Chaise-Sofa-Creamy-White-Det_5-1681976602.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1681976606/crusader/variants/54000099-PT4001/Jonathan-Side-Right-Chaise-Sofa-Creamy-White-Det_6-1681976602.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1681977149/crusader/variants/T54000099/Jonathan-Right-Chaise-Sofa-Creamy-White-Dim-1681977147.png"
          ]
},
        prices: [
          {
            amount: 94900,
            currency_code: 'usd',
          },
          {
            amount: 94900,
            currency_code: 'usd',
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
        metadata: {
          "fabric_composition": "91% Polyester, 4% Nylon, 5% Cotton",
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1681976035/crusader/variants/54000099-GI4001/Jonathan-Right-Chaise-Sofa-Zenith-Bule-Frone-1681976032.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1681976034/crusader/variants/54000099-GI4001/Jonathan-Right-Chaise-Sofa-Zenith-Bule-Angle-1681976032.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1681976035/crusader/variants/54000099-GI4001/Jonathan-Right-Chaise-Sofa-Zenith-Bule-Side-1681976032.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1681976035/crusader/variants/54000099-GI4001/Jonathan-Right-Chaise-Sofa-Zenith-Bule-Back-1681976032.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1683282433/crusader/variants/54000099-GI4001/Jonathan-Side-Right-Chaise-Sectional-Zenith-Bule-Det_12-1683282430.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1682058041/crusader/variants/54000099-GI4001/Jonathan-Side-Right-Chaise-Sofa-Zenith-Bule-Square-Set_1-1682058038.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1682058229/crusader/variants/54000099-GI4001/Jonathan-Extended-Side-Right-Chaise-Sectional-With-Ottoman-Zenith-Bule-Square-Set_1-1682058227.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1682058076/crusader/variants/54000099-GI4001/Jonathan-Extended-Side-Right-Chaise-Sectional-Zenith-Bule-Det_2-1682058073.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1682047531/crusader/variants/54000099-GI4001/Jonathan-Zenith-Blue-Det_1-1682047528.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1682047530/crusader/variants/54000099-GI4001/Jonathan-Sofa-Zenith-Blue-Det_7-1682047528.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1682047530/crusader/variants/54000099-GI4001/Jonathan-Zenith-Blue-Det_2-1682047528.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1681977130/crusader/variants/T54000099/Jonathan-Right-Chaise-Sofa-Zenith-Bule-Dim-1681977127.png"
          ]
},
        prices: [
          {
            amount: 89900,
            currency_code: 'usd',
          },
          {
            amount: 89900,
            currency_code: 'usd',
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
        metadata: {
          "fabric_composition": "70% Polyester, 30% Acrylic",
          "cancellation": "Customisation—no cancellation",
          "returns": "Customisation—no refund or exchange",
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721015308/crusader/variants/54000094C-TL4003/Jonathan-3-Seater-Sofa-Charcoal-Grey-Front-1721015306.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1720667585/crusader/variants/50440775C-TL4003/Charcoal-Grey-Twill_Adams_Owen-1720667583.jpg"
          ]
},
        prices: [
          {
            amount: 99900,
            currency_code: 'usd',
          },
          {
            amount: 99900,
            currency_code: 'usd',
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
        metadata: {
          "fabric_composition": "100% Polyester",
          "cancellation": "Customisation—no cancellation",
          "returns": "Customisation—no refund or exchange",
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721015288/crusader/variants/54000094C-VL4014/Jonathan-3-Seater-Sofa-Olive-Gold-Front-1721015285.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1720577374/crusader/variants/AS-000190C-VL4014-SV/Owen-3-Seater-Sofa-Royal-Gold-Det6-1720577372.jpg"
          ]
},
        prices: [
          {
            amount: 96900,
            currency_code: 'usd',
          },
          {
            amount: 96900,
            currency_code: 'usd',
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
        metadata: {
          "fabric_composition": "80% Polyester, 20% Acrylic",
          "cancellation": "Customisation—no cancellation",
          "returns": "Customisation—no refund or exchange",
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721015260/crusader/variants/54000094C-TL4001/Jonathan-3-Seater-Sofa-Indigo-Blue-Front-1721015257.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721015260/crusader/variants/54000094C-TL4001/Indigo-Blue-Twill_Owen-1721015257.jpg"
          ]
},
        prices: [
          {
            amount: 99900,
            currency_code: 'usd',
          },
          {
            amount: 99900,
            currency_code: 'usd',
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
        metadata: {
          "fabric_composition": "100% Polyester",
          "cancellation": "Customisation—no cancellation",
          "returns": "Customisation—no refund or exchange",
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721015239/crusader/variants/54000094C-CY4003/Jonathan-3-Seater-Sofa-Light-Blush-Front-1721015236.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721015239/crusader/variants/54000094C-CY4003/Lexi-Bed-Light-Blush-Square-Det_3-1721015236.jpg"
          ]
},
        prices: [
          {
            amount: 99900,
            currency_code: 'usd',
          },
          {
            amount: 99900,
            currency_code: 'usd',
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
        metadata: {
          "fabric_composition": "100% Polyester",
          "cancellation": "Customisation—no cancellation",
          "returns": "Customisation—no refund or exchange",
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721015218/crusader/variants/54000094C-CY4001/Jonathan-3-Seater-Sofa-Frost-White-Front-1721015216.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721015218/crusader/variants/54000094C-CY4001/Frost-White_1-1721015216.jpg"
          ]
},
        prices: [
          {
            amount: 99900,
            currency_code: 'usd',
          },
          {
            amount: 99900,
            currency_code: 'usd',
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
        metadata: {
          "fabric_composition": "70% Polyester, 30% Acrylic",
          "cancellation": "Customisation—no cancellation",
          "returns": "Customisation—no refund or exchange",
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721015191/crusader/variants/54000094C-TL4002/Jonathan-3-Seater-Sofa-Pearl-Beige-Front-1721015189.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721015190/crusader/variants/54000094C-TL4002/Owen-3-Seater-Sofa-Pearl-Beige-Det6-1721015188.jpg"
          ]
},
        prices: [
          {
            amount: 99900,
            currency_code: 'usd',
          },
          {
            amount: 99900,
            currency_code: 'usd',
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
        metadata: {
          "fabric_composition": "97% Polyester, 3% Acrylic",
          "cancellation": "Customisation—no cancellation",
          "returns": "Customisation—no refund or exchange",
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721015170/crusader/variants/54000094C-PM4002/Jonathan-3-Seater-Sofa-Performance-Brilliant-White-Front-1721015168.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1720679390/crusader/variants/54000103C-PM4002/Brilliant-White-PlainWeave_Adams_Owen-1720679387.jpg"
          ]
},
        prices: [
          {
            amount: 99900,
            currency_code: 'usd',
          },
          {
            amount: 99900,
            currency_code: 'usd',
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
        metadata: {
          "fabric_composition": "100% Polyester",
          "cancellation": "Customisation—no cancellation",
          "returns": "Customisation—no refund or exchange",
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721015149/crusader/variants/54000094C-CY4002/Jonathan-3-Seater-Sofa-Nickel-Grey-Front-1721015147.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1722479254/crusader/variants/54000094C-CY4002/Nickel-Grey-1722479251.jpg"
          ]
},
        prices: [
          {
            amount: 99900,
            currency_code: 'usd',
          },
          {
            amount: 99900,
            currency_code: 'usd',
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
        metadata: {
          "fabric_composition": "100% Polyester",
          "cancellation": "Customisation—no cancellation",
          "returns": "Customisation—no refund or exchange",
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721015128/crusader/variants/54000094C-PY4001/Jonathan-3-Seater-Sofa-Ivory-Front-1721015126.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1722308046/crusader/variants/AS-000189C-PY4001-GD/Ivory-Swatch-Copy_1-1722308043.jpg"
          ]
},
        prices: [
          {
            amount: 99900,
            currency_code: 'usd',
          },
          {
            amount: 99900,
            currency_code: 'usd',
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
        metadata: {
          "fabric_composition": "100% Polyester",
          "cancellation": "Customisation—no cancellation",
          "returns": "Customisation—no refund or exchange",
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721015105/crusader/variants/54000094C-PY4002/Jonathan-3-Seater-Sofa-Dove-Grey-Front-1721015102.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1722308132/crusader/variants/AS-000189C-PY4002-GD/Dove-Grey-Swatch-Copy_1-1722308130.jpg"
          ]
},
        prices: [
          {
            amount: 99900,
            currency_code: 'usd',
          },
          {
            amount: 99900,
            currency_code: 'usd',
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
        metadata: {
          "fabric_composition": "97% Polyester, 3% Acrylic",
          "cancellation": "Customisation—no cancellation",
          "returns": "Customisation—no refund or exchange",
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1722419258/crusader/variants/54000094C-PM4001/Jonathan-3-Seater-Sofa-Performance-Smoke-Grey-Front__2_-1722419256.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1722419113/crusader/variants/54000094C-PM4001/Smoke-Grey-PlainWeave_Adams-1722419111.jpg"
          ]
},
        prices: [
          {
            amount: 99900,
            currency_code: 'usd',
          },
          {
            amount: 99900,
            currency_code: 'usd',
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
        metadata: {
          "fabric_composition": "100% Polyester",
          "cancellation": "Customisation—no cancellation",
          "returns": "Customisation—no refund or exchange",
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721015053/crusader/variants/54000094C-PY4003/Jonathan-3-Seater-Sofa-Moss-Front-1721015050.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1722308164/crusader/variants/AS-000189C-PY4003-BLK/Moss-Swatch-Copy_1-1722308161.jpg"
          ]
},
        prices: [
          {
            amount: 99900,
            currency_code: 'usd',
          },
          {
            amount: 99900,
            currency_code: 'usd',
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
        metadata: {
          "fabric_composition": "100% Polyester",
          "cancellation": "Customisation—no cancellation",
          "returns": "Customisation—no refund or exchange",
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721121746/crusader/variants/54000099C-PY4004/Jonathan-3-Seater-Sofa-Cumin-Front-1721121743.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1722307826/crusader/variants/AS-000189C-PY4004-BLK/Cumin-Swathc-Copy_1-1722307823.jpg"
          ]
},
        prices: [
          {
            amount: 99900,
            currency_code: 'usd',
          },
          {
            amount: 99900,
            currency_code: 'usd',
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
        metadata: {
          "fabric_composition": "100% Polyester",
          "cancellation": "Customisation—no cancellation",
          "returns": "Customisation—no refund or exchange",
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721014828/crusader/variants/54000094C-IN4003/Jonathan-3-Seater-Sofa-Ginger-Front-1721014825.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1720679762/crusader/variants/54000102C-IN4003/Marlow_Ginger-1720679759.jpg"
          ]
},
        prices: [
          {
            amount: 102900,
            currency_code: 'usd',
          },
          {
            amount: 102900,
            currency_code: 'usd',
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
        metadata: {
          "fabric_composition": "100% Polyester",
          "cancellation": "Customisation—no cancellation",
          "returns": "Customisation—no refund or exchange",
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1721014807/crusader/variants/54000094C-IN4002/Jonathan-3-Seater-Sofa-White-Quartz-Front-1721014804.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1720679628/crusader/variants/54000102C-IN4002/White-Quartz_1-1720679625.jpg"
          ]
},
        prices: [
          {
            amount: 102900,
            currency_code: 'usd',
          },
          {
            amount: 102900,
            currency_code: 'usd',
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
    metadata: {
    "care": "Fabric sofa",
    "filling": "Foam, fibre and pocket spring filled seat; Foam and fibre filled back",
    "cover_type": "Fixed",
    "dimensions": "W132 x D94 x H76.5cm",
    "weight": "32kg",
    "seating_depth": "62cm",
    "seating_height": "42.5cm",
    "comfort_ratings": {
        "overall_sit_rating": "2",
        "seat_depth_rating": "4",
        "seat_height_rating": "3",
        "seat_softness_rating": "2"
    },
    "warranty": "Frame 10 years; Fabric 1 year; Foam 2 years",
    "assembly": "Fully assembled"
},
    category_ids: [categories.find(c => c.name === "Modular Armless Sofas")?.id, categories.find(c => c.name === "Sofa & Armchairs")?.id].filter((id): id is string => Boolean(id)),
    tag_ids: [tags.find(t => t.value === "bestsellers")?.id, tags.find(t => t.value === "storewide_sale")?.id, tags.find(t => t.value === "all furniture excluding accessories\t")?.id, tags.find(t => t.value === "storewide exclude beige covers")?.id, tags.find(t => t.value === "gss event storewide sale excluding gwp")?.id, tags.find(t => t.value === "all product excluding customisation")?.id, tags.find(t => t.value === "match & save")?.id, tags.find(t => t.value === "all products")?.id, tags.find(t => t.value === "modular_sofas")?.id, tags.find(t => t.value === "style_postmodern")?.id, tags.find(t => t.value === "s3_event (do not use)")?.id, tags.find(t => t.value === "minimalist_furniture")?.id, tags.find(t => t.value === "curve_angled_sofa")?.id, tags.find(t => t.value === "all_sofa")?.id].filter((id): id is string => Boolean(id)),
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
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1684308503/crusader/variants/T50440812/Auburn-Performance-Boucle-Curve-Armless-Sofa-Chalk-Dim-1684308493.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692455594/crusader/variants/50440812-AR4002/Auburn-Performance-Boucle-Curve-Armless-Sofa-Basalt-Front-1692455592.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692455592/crusader/variants/50440812-AR4002/Auburn-Performance-Boucle-Curve-Armless-Sofa-Basalt-Angle-1692455590.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692455594/crusader/variants/50440812-AR4002/Auburn-Performance-Boucle-Curve-Armless-Sofa-Basalt-Side-1692455592.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692455594/crusader/variants/50440812-AR4002/Auburn-Performance-Boucle-Curve-Armless-Sofa-Basalt-Back-1692455592.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1693993520/crusader/variants/50440812-AR4002/Auburn-Performance-Boucle-Armless-Curve-3-Seater-Sofa-Basalt-Square-Set_4-1693993520.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1693993514/crusader/variants/50440812-AR4002/Auburn-Performance-Boucle-Curve-L-Shape-Sectional-Sofa-Basalt-Set_1-1693993514.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1693993504/crusader/variants/50440812-AR4002/Auburn-Performance-Boucle-Armless-Curve-3-Seater-Sofa-Basalt-Square-Det_2-1693993504.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692443227/crusader/variants/50440808-AR4002/Auburn-Performance-Boucle-Sofa-Basalt-Square-Det_3-1692443225.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692442156/crusader/variants/50440808-AR4002/Auburn-Performance-Boucle-Sofa-Basalt-Square-Det_2-1692442154.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692614526/crusader/variants/T50440812/Auburn-Performance-Boucle-Curve-Armless-Sofa-Basalt-Dim-1692614523.png"
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
        metadata: {
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1683792587/crusader/variants/50440812-CB4001/Auburn-Performance-Boucle-Curve-Armless-Sofa-Chalk-Front-1683792584.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1683792587/crusader/variants/50440812-CB4001/Auburn-Performance-Boucle-Curve-Armless-Sofa-Chalk-Angle-1683792584.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1683792587/crusader/variants/50440812-CB4001/Auburn-Performance-Boucle-Curve-Armless-Sofa-Chalk-Side-1683792585.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1683792587/crusader/variants/50440812-CB4001/Auburn-Performance-Boucle-Curve-Armless-Sofa-Chalk-Back-1683792585.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1683793661/crusader/variants/50440812-CB4001/Auburn-Performance-Boucle-Armless-Curve-3-Seater-Sofa-Chalk-Square-Set_2-1683793659.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1683793662/crusader/variants/50440812-CB4001/Auburn-Performance-Boucle-Curve-3-Seater-Sofa-Chalk-Square-Set_5-1683793659.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1683793661/crusader/variants/50440812-CB4001/Auburn-Performance-Boucle-Curve-3-Seater-Sofa-Chalk-Square-Det_2-1683793659.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1683792607/crusader/variants/50440812-CB4001/Auburn-Performance-Boucle-Sofa-Chalk-Det_3-1683792604.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1683792607/crusader/variants/50440812-CB4001/Auburn-Performance-Boucle-Sofa-Chalk-Det_4-1683792604.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1684308503/crusader/variants/T50440812/Auburn-Performance-Boucle-Curve-Armless-Sofa-Chalk-Dim-1684308493.png"
          ]
},
        prices: [
          {
            amount: 89900,
            currency_code: 'usd',
          },
          {
            amount: 89900,
            currency_code: 'usd',
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
        metadata: {
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692455594/crusader/variants/50440812-AR4002/Auburn-Performance-Boucle-Curve-Armless-Sofa-Basalt-Front-1692455592.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692455592/crusader/variants/50440812-AR4002/Auburn-Performance-Boucle-Curve-Armless-Sofa-Basalt-Angle-1692455590.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692455594/crusader/variants/50440812-AR4002/Auburn-Performance-Boucle-Curve-Armless-Sofa-Basalt-Side-1692455592.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692455594/crusader/variants/50440812-AR4002/Auburn-Performance-Boucle-Curve-Armless-Sofa-Basalt-Back-1692455592.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1693993520/crusader/variants/50440812-AR4002/Auburn-Performance-Boucle-Armless-Curve-3-Seater-Sofa-Basalt-Square-Set_4-1693993520.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1693993514/crusader/variants/50440812-AR4002/Auburn-Performance-Boucle-Curve-L-Shape-Sectional-Sofa-Basalt-Set_1-1693993514.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1693993504/crusader/variants/50440812-AR4002/Auburn-Performance-Boucle-Armless-Curve-3-Seater-Sofa-Basalt-Square-Det_2-1693993504.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692443227/crusader/variants/50440808-AR4002/Auburn-Performance-Boucle-Sofa-Basalt-Square-Det_3-1692443225.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692442156/crusader/variants/50440808-AR4002/Auburn-Performance-Boucle-Sofa-Basalt-Square-Det_2-1692442154.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692614526/crusader/variants/T50440812/Auburn-Performance-Boucle-Curve-Armless-Sofa-Basalt-Dim-1692614523.png"
          ]
},
        prices: [
          {
            amount: 89900,
            currency_code: 'usd',
          },
          {
            amount: 89900,
            currency_code: 'usd',
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
    metadata: {
    "care": "Fabric sofa",
    "filling": "Foam, fibre and pocket spring filled seat; Foam and fibre filled back",
    "cover_type": "Fixed",
    "dimensions": "W321 x D321 x H76.5​​cm",
    "weight": "148.4kg",
    "seating_depth": "62cm",
    "seating_height": "42.5cm",
    "comfort_ratings": {
        "overall_sit_rating": "2",
        "seat_depth_rating": "4",
        "seat_height_rating": "3",
        "seat_softness_rating": "2"
    },
    "warranty": "Frame 10 years; Fabric 1 year; Foam 2 years",
    "assembly": "Fully assembled"
},
    category_ids: [categories.find(c => c.name === "L-Shape Sectional Sofas")?.id, categories.find(c => c.name === "Sofa & Armchairs")?.id].filter((id): id is string => Boolean(id)),
    tag_ids: [tags.find(t => t.value === "bestsellers")?.id, tags.find(t => t.value === "storewide_sale")?.id, tags.find(t => t.value === "all furniture excluding accessories\t")?.id, tags.find(t => t.value === "storewide exclude beige covers")?.id, tags.find(t => t.value === "gss event storewide sale excluding gwp")?.id, tags.find(t => t.value === "all product excluding customisation")?.id, tags.find(t => t.value === "match & save")?.id, tags.find(t => t.value === "all products")?.id, tags.find(t => t.value === "modular_sofas")?.id, tags.find(t => t.value === "style_postmodern")?.id, tags.find(t => t.value === "s3_event (do not use)")?.id, tags.find(t => t.value === "modern_luxe")?.id, tags.find(t => t.value === "minimalist_furniture")?.id, tags.find(t => t.value === "performance_boucle_sofas")?.id, tags.find(t => t.value === "all_sofa")?.id].filter((id): id is string => Boolean(id)),
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
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1685332835/crusader/variants/T50441135/Auburn-Performance-Boucle-Extended-L-Shape-Sectional-Sofa-Chalk-Dim-1685332833.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692457458/crusader/variants/AS-000309-AR4002/Auburn-Performance-Boucle-Extended-L-Shape-Sectional-Sofa-Basalt-Front-1692457455.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692457457/crusader/variants/AS-000309-AR4002/Auburn-Performance-Boucle-Extended-L-Shape-Sectional-Sofa-Basalt-Side-1692457454.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692457462/crusader/variants/AS-000309-AR4002/Auburn-Performance-Boucle-Extended-L-Shape-Sectional-Sofa-Basalt-Back-1692457460.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1693994465/crusader/variants/AS-000309-AR4002/Auburn-Performance-Boucle-Extended-L-Shape-Sectional-Sofa-Basalt-Square-Set_5-1693994465.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1693994465/crusader/variants/AS-000309-AR4002/Auburn-Performance-Boucle-Extended-L-Shape-Sectional-Sofa-Basalt-Set_2-1693994465.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1693994538/crusader/variants/AS-000309-AR4002/Auburn-Performance-Boucle-L-Shape-Sectional-Sofa-Basalt-Square-Det_1-1693994538.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692443229/crusader/variants/50440808-AR4002/Auburn-Performance-Boucle-3-Seater-Sofa-Basalt-Square-Det_5-1692443226.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692443227/crusader/variants/50440808-AR4002/Auburn-Performance-Boucle-Sofa-Basalt-Square-Det_3-1692443225.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692442156/crusader/variants/50440808-AR4002/Auburn-Performance-Boucle-Sofa-Basalt-Square-Det_2-1692442154.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692615501/crusader/variants/TAS-000309/Auburn-Performance-Boucle-Extended-L-Shape-Sectional-Sofa-Basalt-Dim-1692615498.png"
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
        metadata: {
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1683795327/crusader/variants/50441135-CB4001/Auburn-Performance-Boucle-Extended-L-Shape-Sectional-Sofa-Chalk-Front-1683795325.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1683795327/crusader/variants/50441135-CB4001/Auburn-Performance-Boucle-Extended-L-Shape-Sectional-Sofa-Chalk-Side-1683795325.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1683795327/crusader/variants/50441135-CB4001/Auburn-Performance-Boucle-Extended-L-Shape-Sectional-Sofa-Chalk-Back-1683795325.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1683796668/crusader/variants/50441135-CB4001/Auburn-Performance-Boucle-Extended-L-Shape-Sectional-Sofa-Chalk-Square-Set_5-1683796666.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1683796668/crusader/variants/50441135-CB4001/Auburn-Performance-Boucle-Extended-L-Shape-Sectional-Sofa-Chalk-Square-Set_4-1683796666.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1684309216/crusader/variants/T50441135-CB4001/Auburn-Performance-Boucle-Curve-3-Seater-Sofa-Chalk-Square-Det_2-1684309213.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1683795373/crusader/variants/50441135-CB4001/Auburn-Performance-Boucle-Extended-3-Seater-Sofa-Chalk_-Det_1-1683795370.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1683795371/crusader/variants/50441135-CB4001/Auburn-Performance-Boucle-Sofa-Chalk-Det_3-1683795368.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1683795373/crusader/variants/50441135-CB4001/Auburn-Performance-Boucle-Sofa-Chalk-Det_4-1683795371.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1685332835/crusader/variants/T50441135/Auburn-Performance-Boucle-Extended-L-Shape-Sectional-Sofa-Chalk-Dim-1685332833.png"
          ]
},
        prices: [
          {
            amount: 408500,
            currency_code: 'usd',
          },
          {
            amount: 408500,
            currency_code: 'usd',
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
        metadata: {
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692457458/crusader/variants/AS-000309-AR4002/Auburn-Performance-Boucle-Extended-L-Shape-Sectional-Sofa-Basalt-Front-1692457455.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692457457/crusader/variants/AS-000309-AR4002/Auburn-Performance-Boucle-Extended-L-Shape-Sectional-Sofa-Basalt-Side-1692457454.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692457462/crusader/variants/AS-000309-AR4002/Auburn-Performance-Boucle-Extended-L-Shape-Sectional-Sofa-Basalt-Back-1692457460.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1693994465/crusader/variants/AS-000309-AR4002/Auburn-Performance-Boucle-Extended-L-Shape-Sectional-Sofa-Basalt-Square-Set_5-1693994465.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1693994465/crusader/variants/AS-000309-AR4002/Auburn-Performance-Boucle-Extended-L-Shape-Sectional-Sofa-Basalt-Set_2-1693994465.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1693994538/crusader/variants/AS-000309-AR4002/Auburn-Performance-Boucle-L-Shape-Sectional-Sofa-Basalt-Square-Det_1-1693994538.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692443229/crusader/variants/50440808-AR4002/Auburn-Performance-Boucle-3-Seater-Sofa-Basalt-Square-Det_5-1692443226.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692443227/crusader/variants/50440808-AR4002/Auburn-Performance-Boucle-Sofa-Basalt-Square-Det_3-1692443225.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692442156/crusader/variants/50440808-AR4002/Auburn-Performance-Boucle-Sofa-Basalt-Square-Det_2-1692442154.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692615501/crusader/variants/TAS-000309/Auburn-Performance-Boucle-Extended-L-Shape-Sectional-Sofa-Basalt-Dim-1692615498.png"
          ]
},
        prices: [
          {
            amount: 408500,
            currency_code: 'usd',
          },
          {
            amount: 408500,
            currency_code: 'usd',
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
    metadata: {
    "material": "Table Top: solid walnut; Leg: metal",
    "care": "Wooden table",
    "dimensions": "W120 x D70 x H60-125cm",
    "weight": "42.1kg",
    "warranty": "5-year limited warranty",
    "assembly": "Frame to be fitted"
},
    category_ids: [categories.find(c => c.name === "Tables")?.id, categories.find(c => c.name === "Desks")?.id].filter((id): id is string => Boolean(id)),
    tag_ids: [tags.find(t => t.value === "bestsellers")?.id, tags.find(t => t.value === "storewide_sale")?.id, tags.find(t => t.value === "all furniture excluding accessories\t")?.id, tags.find(t => t.value === "storewide exclude beige covers")?.id, tags.find(t => t.value === "gss event storewide sale excluding gwp")?.id, tags.find(t => t.value === "all product excluding customisation")?.id, tags.find(t => t.value === "match & save")?.id, tags.find(t => t.value === "all products")?.id, tags.find(t => t.value === "style_midcenturymodern")?.id, tags.find(t => t.value === "new_arrivals")?.id, tags.find(t => t.value === "s1_2023_skus")?.id].filter((id): id is string => Boolean(id)),
    
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
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1677489865/crusader/variants/T50441117/Emmerson-Adjustable-Standing-Desk-120cm-Dim-1677489863.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1768879769/crusader/variants/AS-000998-OA/Emmerson-Adjustable-Desk-120cm-Oak-Angle-1768879767.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1756433203/crusader/variants/AS-000998-OA/Emmerson-Adjustable-Desk-120cm-Oak-Front-1756433201.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1768987733/crusader/variants/AS-000998-OA/Emmerson-Adjustable-Desk-120cm-Oak-Side-1768987731.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1645082319/crusader/variants/T50441014/Emmerson-Adjustable-Standing-Desk-Oak-Square-Set_6.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1645082359/crusader/variants/T50441014/Emmerson-Adjustable-Standing-Desk-Oak-Square-Set_2.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1645082359/crusader/variants/T50441014/Emmerson-Adjustable-Standing-Desk-Oak-Square-Set_5.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1756432902/crusader/variants/AS-000997-OA/Emmerson-Adjustable-Desk-120cm-Oak-Usp-Det_2-1756432900.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1756432903/crusader/variants/AS-000997-OA/Emmerson-Adjustable-Desk-120cm-Oak-Usp-Det_3-1756432900.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1756432902/crusader/variants/AS-000997-OA/Emmerson-Adjustable-Desk-120cm-Oak-Usp-Det_1-1756432900.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1645082403/crusader/variants/T50441014/Emmerson-Adjustable-Standing-Desk-Oak-Square-Det_6.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1756872046/crusader/variants/TAS-000312/Emmerson-Adjustable-Desk-120cm-Oak-Dim-1756872044.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1768879809/crusader/variants/AS-000997-OA/Emmerson-Adjustable-Desk-140cm-Oak-Angle-1768879807.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1756432861/crusader/variants/AS-000997-OA/Emmerson-Adjustable-Desk-140cm-Oak-Front-1756432859.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1768987782/crusader/variants/AS-000997-OA/Emmerson-Adjustable-Desk-140cm-Oak-Side-1768987780.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1756872046/crusader/variants/TAS-000312/Emmerson-Adjustable-Desk-140cm-Oak-Dim-1756872044.png"
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
        metadata: {
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1677489516/crusader/variants/T50441118/Emmerson-Adjustable-Standing-Desk-Angle-120cm_1-1677489514.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1677489611/crusader/variants/T50441118/Emmerson-Adjustable-Standing-Desk-Det_1-1677489605.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1677489516/crusader/variants/T50441118/Emmerson-Adjustable-Standing-Desk-Front-120cm_1-1677489514.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1677489516/crusader/variants/T50441118/Emmerson-Adjustable-Standing-Desk-Side-120cm_2-1677489514.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1677489516/crusader/variants/T50441118/Emmerson-Adjustable-Standing-Desk-Back-120cm_1-1677489514.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1678353385/crusader/variants/T50441118/Emmerson-Adjustable-Standing-Desk-Walnut-3-Stage-Leg-Square-Set_4-1678353382.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1678353470/crusader/variants/T50441119/Emmerson-Adjustable-Standing-Desk-Walnut-3-Stage-Leg-Square-Set_1-1678353468.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1678353791/crusader/variants/T50441119/Emmerson-Adjustable-Standing-Desk-Walnut-3-Stage-Leg-Square-Det_2-1678353789.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1679372098/crusader/variants/T50441119/Emmerson-Adjustable-Standing-Desk-Copy-1679372093.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1679384250/crusader/variants/T50441119/Emmerson-Adjustable-Standing-Desk-Square-Det_2-1679384248.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1677489656/crusader/variants/T50441118/Emmerson-Adjustable-Standing-Desk-Square-Det_4-1677489653.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1677489865/crusader/variants/T50441117/Emmerson-Adjustable-Standing-Desk-120cm-Dim-1677489863.png"
          ]
},
        prices: [
          {
            amount: 89900,
            currency_code: 'usd',
          },
          {
            amount: 89900,
            currency_code: 'usd',
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
        metadata: {
          "finish": "Clear lacquer",
          "material": "Table top: solid oak; Leg: metal",
          "product_weight": "47kg",
          "packaging_dimensions": "2 boxes",
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1768879769/crusader/variants/AS-000998-OA/Emmerson-Adjustable-Desk-120cm-Oak-Angle-1768879767.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1756433203/crusader/variants/AS-000998-OA/Emmerson-Adjustable-Desk-120cm-Oak-Front-1756433201.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1768987733/crusader/variants/AS-000998-OA/Emmerson-Adjustable-Desk-120cm-Oak-Side-1768987731.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1645082319/crusader/variants/T50441014/Emmerson-Adjustable-Standing-Desk-Oak-Square-Set_6.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1645082359/crusader/variants/T50441014/Emmerson-Adjustable-Standing-Desk-Oak-Square-Set_2.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1645082359/crusader/variants/T50441014/Emmerson-Adjustable-Standing-Desk-Oak-Square-Set_5.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1756432902/crusader/variants/AS-000997-OA/Emmerson-Adjustable-Desk-120cm-Oak-Usp-Det_2-1756432900.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1756432903/crusader/variants/AS-000997-OA/Emmerson-Adjustable-Desk-120cm-Oak-Usp-Det_3-1756432900.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1756432902/crusader/variants/AS-000997-OA/Emmerson-Adjustable-Desk-120cm-Oak-Usp-Det_1-1756432900.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1645082403/crusader/variants/T50441014/Emmerson-Adjustable-Standing-Desk-Oak-Square-Det_6.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1756872046/crusader/variants/TAS-000312/Emmerson-Adjustable-Desk-120cm-Oak-Dim-1756872044.png"
          ]
},
        prices: [
          {
            amount: 87900,
            currency_code: 'usd',
          },
          {
            amount: 87900,
            currency_code: 'usd',
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
        metadata: {
          "finish": "Clear lacquer",
          "material": "Table top: solid oak; Leg: metal",
          "general_dimensions": "W140 x D70 x H (60-125)cm",
          "product_weight": "48.5kg",
          "packaging_dimensions": "2 boxes",
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1768879809/crusader/variants/AS-000997-OA/Emmerson-Adjustable-Desk-140cm-Oak-Angle-1768879807.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1756432861/crusader/variants/AS-000997-OA/Emmerson-Adjustable-Desk-140cm-Oak-Front-1756432859.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1768987782/crusader/variants/AS-000997-OA/Emmerson-Adjustable-Desk-140cm-Oak-Side-1768987780.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1645082319/crusader/variants/T50441014/Emmerson-Adjustable-Standing-Desk-Oak-Square-Set_6.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1645082359/crusader/variants/T50441014/Emmerson-Adjustable-Standing-Desk-Oak-Square-Set_2.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1645082359/crusader/variants/T50441014/Emmerson-Adjustable-Standing-Desk-Oak-Square-Set_5.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1756432902/crusader/variants/AS-000997-OA/Emmerson-Adjustable-Desk-120cm-Oak-Usp-Det_2-1756432900.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1756432903/crusader/variants/AS-000997-OA/Emmerson-Adjustable-Desk-120cm-Oak-Usp-Det_3-1756432900.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1756432902/crusader/variants/AS-000997-OA/Emmerson-Adjustable-Desk-120cm-Oak-Usp-Det_1-1756432900.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1645082403/crusader/variants/T50441014/Emmerson-Adjustable-Standing-Desk-Oak-Square-Det_6.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1756872046/crusader/variants/TAS-000312/Emmerson-Adjustable-Desk-140cm-Oak-Dim-1756872044.png"
          ]
},
        prices: [
          {
            amount: 92900,
            currency_code: 'usd',
          },
          {
            amount: 92900,
            currency_code: 'usd',
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
    metadata: {
    "filling": "100% duck feather, filling 650g",
    "dimensions": "W30 x D50cm",
    "weight": "0.85kg (per cushion)",
    "warranty": "1-year limited warranty",
    "assembly": "Fully assembled"
},
    category_ids: [categories.find(c => c.name === "Accessories")?.id, categories.find(c => c.name === "Cushions")?.id].filter((id): id is string => Boolean(id)),
    tag_ids: [tags.find(t => t.value === "c&c_accessories")?.id, tags.find(t => t.value === "new")?.id].filter((id): id is string => Boolean(id)),
    
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
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1762964963/crusader/variants/T50441112-TI/Tilly-Throw-Cushion-30x50cm-Ash-Dim-1762964961.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1762965411/crusader/variants/50441113-F00902/Tilly-Throw-Cushion-30x50cm-Ecru-Front-1762965409.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1762965411/crusader/variants/50441113-F00902/Tilly-Throw-Cushion-30x50cm-Ecru-Back-1762965409.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1762965411/crusader/variants/50441113-F00902/Tilly-Cushion-50x50cm-Collection-Square-Set_1_-1762965409.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1762965411/crusader/variants/50441113-F00902/Tilly-Throw-Cushion-50x50cm-Ecru-Det_1-1762965409.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1762965411/crusader/variants/50441113-F00902/Tilly-Throw-Cushion-50x50cm-Ecru-Det_3-1762965409.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1762964963/crusader/variants/T50441112-TI/Tilly-Throw-Cushion-30x50cm-Ecru-Dim-1762964961.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1762965279/crusader/variants/50441112-F00901/Tilly-Throw-Cushion-50x50cm-Ash--Front-1762965276.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1762965279/crusader/variants/50441112-F00901/Tilly-Throw-Cushion-50x50cm-Ash-Back-1762965276.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1762965290/crusader/variants/50441112-F00901/Tilly-Cushion-50x50cm-Collection-Square-Set_1_-1762965287.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1762965278/crusader/variants/50441112-F00901/Tilly-Throw-Cushion-50x50cm-Ash-Det_3-1762965276.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1762965278/crusader/variants/50441112-F00901/Tilly-Throw-Cushion-50x50cm-Ash-Det_1-1762965276.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1762964963/crusader/variants/T50441112-TI/Tilly-Throw-Cushion-50x50cm-Ash-Dim-1762964961.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1762965381/crusader/variants/50441112-F00902/Tilly-Throw-Cushion-50x50cm-Ecru-Front-1762965378.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1762965380/crusader/variants/50441112-F00902/Tilly-Throw-Cushion-50x50cm-Ecru-Back-1762965378.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1762965381/crusader/variants/50441112-F00902/Tilly-Cushion-50x50cm-Collection-Square-Set_1_-1762965378.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1762965380/crusader/variants/50441112-F00902/Tilly-Throw-Cushion-50x50cm-Ecru-Det_1-1762965378.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1762965380/crusader/variants/50441112-F00902/Tilly-Throw-Cushion-50x50cm-Ecru-Det_3-1762965378.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1762964964/crusader/variants/T50441112-TI/Tilly-Throw-Cushion-50x50cm-Ecru-Dim-1762964961.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1762965203/crusader/variants/50441112-F00903/Tilly-Throw-Cushion-50x50cm-Oyster-Front__1_-1762965201.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1762965203/crusader/variants/50441112-F00903/Tilly-Throw-Cushion-50x50cm-Oyster-Back-1762965201.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1762965203/crusader/variants/50441112-F00903/Tilly-Cushion-50x50cm-Collection-Square-Set_1_-1762965201.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1762965203/crusader/variants/50441112-F00903/Tilly-Throw-Cushion-50x50cm-Oyster-Det_1-1762965201.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1762965203/crusader/variants/50441112-F00903/Tilly-Throw-Cushion-50x50cm-Oyster-Det_3-1762965201.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1762964963/crusader/variants/T50441112-TI/Tilly-Throw-Cushion-50x50cm-Oyster-Dim-1762964961.png"
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
        metadata: {
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1762965327/crusader/variants/50441113-F00901/Tilly-Throw-Cushion-30x50cm-Ash-Front-1762965324.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1762965327/crusader/variants/50441113-F00901/Tilly-Throw-Cushion-30x50cm-Ash-Back-1762965324.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1762965327/crusader/variants/50441113-F00901/Tilly-Cushion-50x50cm-Collection-Square-Set_1_-1762965325.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1762965327/crusader/variants/50441113-F00901/Tilly-Throw-Cushion-50x50cm-Ash-Det_3-1762965325.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1762965327/crusader/variants/50441113-F00901/Tilly-Throw-Cushion-50x50cm-Ash-Det_1-1762965325.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1762964963/crusader/variants/T50441112-TI/Tilly-Throw-Cushion-30x50cm-Ash-Dim-1762964961.png"
          ]
},
        prices: [
          {
            amount: 4900,
            currency_code: 'usd',
          },
          {
            amount: 4900,
            currency_code: 'usd',
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
        metadata: {
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1762965411/crusader/variants/50441113-F00902/Tilly-Throw-Cushion-30x50cm-Ecru-Front-1762965409.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1762965411/crusader/variants/50441113-F00902/Tilly-Throw-Cushion-30x50cm-Ecru-Back-1762965409.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1762965411/crusader/variants/50441113-F00902/Tilly-Cushion-50x50cm-Collection-Square-Set_1_-1762965409.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1762965411/crusader/variants/50441113-F00902/Tilly-Throw-Cushion-50x50cm-Ecru-Det_1-1762965409.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1762965411/crusader/variants/50441113-F00902/Tilly-Throw-Cushion-50x50cm-Ecru-Det_3-1762965409.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1762964963/crusader/variants/T50441112-TI/Tilly-Throw-Cushion-30x50cm-Ecru-Dim-1762964961.png"
          ]
},
        prices: [
          {
            amount: 4900,
            currency_code: 'usd',
          },
          {
            amount: 4900,
            currency_code: 'usd',
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
        metadata: {
          "filling": "100% duck feather, filling 1100g",
          "general_dimensions": "W50 x D50cm",
          "product_weight": "1.69kg (per cushion)",
          "packaging_dimensions": "1 box",
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1762965279/crusader/variants/50441112-F00901/Tilly-Throw-Cushion-50x50cm-Ash--Front-1762965276.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1762965279/crusader/variants/50441112-F00901/Tilly-Throw-Cushion-50x50cm-Ash-Back-1762965276.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1762965290/crusader/variants/50441112-F00901/Tilly-Cushion-50x50cm-Collection-Square-Set_1_-1762965287.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1762965278/crusader/variants/50441112-F00901/Tilly-Throw-Cushion-50x50cm-Ash-Det_3-1762965276.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1762965278/crusader/variants/50441112-F00901/Tilly-Throw-Cushion-50x50cm-Ash-Det_1-1762965276.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1762964963/crusader/variants/T50441112-TI/Tilly-Throw-Cushion-50x50cm-Ash-Dim-1762964961.png"
          ]
},
        prices: [
          {
            amount: 5900,
            currency_code: 'usd',
          },
          {
            amount: 5900,
            currency_code: 'usd',
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
        metadata: {
          "filling": "100% duck feather, filling 1100g",
          "general_dimensions": "W50 x D50cm",
          "product_weight": "1.69kg (per cushion)",
          "packaging_dimensions": "1 box",
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1762965381/crusader/variants/50441112-F00902/Tilly-Throw-Cushion-50x50cm-Ecru-Front-1762965378.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1762965380/crusader/variants/50441112-F00902/Tilly-Throw-Cushion-50x50cm-Ecru-Back-1762965378.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1762965381/crusader/variants/50441112-F00902/Tilly-Cushion-50x50cm-Collection-Square-Set_1_-1762965378.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1762965380/crusader/variants/50441112-F00902/Tilly-Throw-Cushion-50x50cm-Ecru-Det_1-1762965378.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1762965380/crusader/variants/50441112-F00902/Tilly-Throw-Cushion-50x50cm-Ecru-Det_3-1762965378.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1762964964/crusader/variants/T50441112-TI/Tilly-Throw-Cushion-50x50cm-Ecru-Dim-1762964961.png"
          ]
},
        prices: [
          {
            amount: 5900,
            currency_code: 'usd',
          },
          {
            amount: 5900,
            currency_code: 'usd',
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
        metadata: {
          "filling": "100% duck feather, filling 1100g",
          "general_dimensions": "W50 x D50cm",
          "product_weight": "1.69kg (per cushion)",
          "packaging_dimensions": "1 box",
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1762965203/crusader/variants/50441112-F00903/Tilly-Throw-Cushion-50x50cm-Oyster-Front__1_-1762965201.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1762965203/crusader/variants/50441112-F00903/Tilly-Throw-Cushion-50x50cm-Oyster-Back-1762965201.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1762965203/crusader/variants/50441112-F00903/Tilly-Cushion-50x50cm-Collection-Square-Set_1_-1762965201.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1762965203/crusader/variants/50441112-F00903/Tilly-Throw-Cushion-50x50cm-Oyster-Det_1-1762965201.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1762965203/crusader/variants/50441112-F00903/Tilly-Throw-Cushion-50x50cm-Oyster-Det_3-1762965201.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1762964963/crusader/variants/T50441112-TI/Tilly-Throw-Cushion-50x50cm-Oyster-Dim-1762964961.png"
          ]
},
        prices: [
          {
            amount: 5900,
            currency_code: 'usd',
          },
          {
            amount: 5900,
            currency_code: 'usd',
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
    metadata: {
    "material": "Table Top: engineered wood with oak veneer; Leg: solid oak",
    "care": "Extendable table",
    "dimensions": "W190/280 x D95 x H76cm",
    "weight": "93.5kg",
    "warranty": "5-year limited warranty",
    "assembly": "Legs to be fitted"
},
    category_ids: [categories.find(c => c.name === "Extendable Dining Tables")?.id, categories.find(c => c.name === "Tables")?.id].filter((id): id is string => Boolean(id)),
    tag_ids: [tags.find(t => t.value === "clearance")?.id, tags.find(t => t.value === "sale")?.id, tags.find(t => t.value === "bestsellers")?.id, tags.find(t => t.value === "storewide_sale")?.id, tags.find(t => t.value === "all furniture excluding accessories\t")?.id, tags.find(t => t.value === "storewide exclude beige covers")?.id, tags.find(t => t.value === "gss event storewide sale excluding gwp")?.id, tags.find(t => t.value === "all product excluding customisation")?.id, tags.find(t => t.value === "match & save")?.id, tags.find(t => t.value === "all_indoor_dining_table")?.id, tags.find(t => t.value === "highlight")?.id, tags.find(t => t.value === "all products")?.id, tags.find(t => t.value === "extendable_dining_tables")?.id, tags.find(t => t.value === "style_modernfarmhouse")?.id, tags.find(t => t.value === "minimalist_furniture")?.id, tags.find(t => t.value === "japandi_furniture")?.id, tags.find(t => t.value === "all_dining_table")?.id, tags.find(t => t.value === "new_arrivals")?.id, tags.find(t => t.value === "s1_2023_skus")?.id].filter((id): id is string => Boolean(id)),
    
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
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1673938028/crusader/variants/50220003/Dillon-Extendable-Dining-Table-190cm-Dim-1673938026.png"
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
        metadata: {
          "cancellation": "Clearance—no cancellation",
          "returns": "Clearance—no return or exchange",
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1673937390/crusader/variants/50220003/Dillon-Extendable-Dining-Table-190cm-Front_1-1673937388.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1673937390/crusader/variants/50220003/Dillon-Extendable-Dining-Table-190cm-Angle_2-1673937388.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1673937390/crusader/variants/50220003/Dillon-Extendable-Dining-Table-190cm-Side-1673937388.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1673937635/crusader/variants/50220003/Dillon-Extendable-Dining-Table-190cm-Front-1673937633.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1673937390/crusader/variants/50220003/Dillon-Extendable-Dining-Table-190cm-Angle-1673937388.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1676537490/crusader/variants/50220003/Dillon-Extendable-Dining-Table-280cm-Set_2-1676537487.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1676537676/crusader/variants/50220003/Dillon-Extendable-Dining-Table-280cm-Set_1-1676537673.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1700453966/crusader/variants/50220003/Austen-Dining-Arm-Chair-White-Wash-Square-Set_3-1700453963.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1673937416/crusader/variants/50220003/Dillon-Extendable-Dining-Table-190cm-Det_1-1673937414.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1673937416/crusader/variants/50220003/Dillon-Extendable-Dining-Table-190cm-Det_2-1673937414.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1673937416/crusader/variants/50220003/Dillon-Extendable-Dining-Table-190cm-Det_3-1673937414.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1673937417/crusader/variants/50220003/Dillon-Extendable-Dining-Table-190cm-Det_4-1673937414.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1676537856/crusader/variants/50220003/Dillon-Wood-Disclamer-1676537853.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1673938028/crusader/variants/50220003/Dillon-Extendable-Dining-Table-190cm-Dim-1673938026.png"
          ]
},
        prices: [
          {
            amount: 83900,
            currency_code: 'usd',
          },
          {
            amount: 83900,
            currency_code: 'usd',
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
    metadata: {
    "material": "Table Top: engineered wood with oak veneer; Leg: solid elm",
    "care": "Wooden table",
    "dimensions": "W120 x D60 x H40cm",
    "weight": "23.5kg",
    "warranty": "5-year limited warranty",
    "assembly": "Legs to be fitted"
},
    category_ids: [categories.find(c => c.name === "Coffee Tables")?.id, categories.find(c => c.name === "Tables")?.id].filter((id): id is string => Boolean(id)),
    tag_ids: [tags.find(t => t.value === "bestsellers")?.id, tags.find(t => t.value === "storewide_sale")?.id, tags.find(t => t.value === "all furniture excluding accessories\t")?.id, tags.find(t => t.value === "storewide exclude beige covers")?.id, tags.find(t => t.value === "gss event storewide sale excluding gwp")?.id, tags.find(t => t.value === "all product excluding customisation")?.id, tags.find(t => t.value === "match & save")?.id, tags.find(t => t.value === "all_coffee_table")?.id, tags.find(t => t.value === "all products")?.id, tags.find(t => t.value === "s3_event_tag")?.id, tags.find(t => t.value === "style_modernfarmhouse")?.id, tags.find(t => t.value === "sofa_bundle_complementary_products")?.id].filter((id): id is string => Boolean(id)),
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
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692437137/crusader/variants/T50220010/Sawyer-Rectangular-Coffee-Table-120cm_-Dim-1692437135.png"
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
        metadata: {
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692436666/crusader/variants/50220010/Sawyer-Rectangular-Coffee-Table-120cm_-Angle-1692436664.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692436666/crusader/variants/50220010/Sawyer-Rectangular-Coffee-Table-120cm_-Front-1692436664.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692436665/crusader/variants/50220010/Sawyer-Rectangular-Coffee-Table-120cm_-Side-1692436663.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692437049/crusader/variants/50220010/Sawyer-Rectangular-Coffee-Table-Square-Set_1-1692437047.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1700536994/crusader/variants/50220010/Auburn-Performance-Boucle-Extended-3-Seater-Sofa-Basalt-Square-Set_5-1700536991.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1700536994/crusader/variants/50220010/Auburn-Performance-Boucle-Curve-L-Shape-Sectional-Sofa-Basalt-With-2-Rectangular-Storage-Console-Black-Square-Set_4-1700536991.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692436990/crusader/variants/50220010/Sawyer-Rectangular-Coffee-Table-120cm_-Det_3-1692436988.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692437020/crusader/variants/50220010/Sawyer-Rectangular-Coffee-Table-120cm_-Det_4-1692437018.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692435335/crusader/variants/50220010/Sawyer-Wood-Disclamer-1692435333.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692437137/crusader/variants/T50220010/Sawyer-Rectangular-Coffee-Table-120cm_-Dim-1692437135.png"
          ]
},
        prices: [
          {
            amount: 59900,
            currency_code: 'usd',
          },
          {
            amount: 59900,
            currency_code: 'usd',
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
    metadata: {
    "care": "Leather sofa",
    "filling": "Foam, fibre and pocket spring filled seat; Foam and fibre filled back",
    "cover_type": "Non-removable cover",
    "dimensions": "W139 x D100 x H70cm",
    "weight": "32.8kg",
    "seating_depth": "62cm",
    "seating_height": "41cm",
    "comfort_ratings": {
        "overall_sit_rating": "2",
        "seat_depth_rating": "4",
        "seat_height_rating": "3",
        "seat_softness_rating": "2"
    },
    "warranty": "Frame 10 years; Leather 1 year; Foam 2 years",
    "assembly": "Fully assembled"
},
    category_ids: [categories.find(c => c.name === "Modular Chaises")?.id, categories.find(c => c.name === "Sofa & Armchairs")?.id].filter((id): id is string => Boolean(id)),
    tag_ids: [tags.find(t => t.value === "bestsellers")?.id, tags.find(t => t.value === "storewide_sale")?.id, tags.find(t => t.value === "all furniture excluding accessories\t")?.id, tags.find(t => t.value === "storewide exclude beige covers")?.id, tags.find(t => t.value === "gss event storewide sale excluding gwp")?.id, tags.find(t => t.value === "all product excluding customisation")?.id, tags.find(t => t.value === "match & save")?.id, tags.find(t => t.value === "all products")?.id, tags.find(t => t.value === "modular_sofas")?.id, tags.find(t => t.value === "s3_event_tag")?.id, tags.find(t => t.value === "style_moderncontemporary")?.id].filter((id): id is string => Boolean(id)),
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
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692352585/crusader/variants/T54000098-LE/Jonathan-Leather-Side-Left-Chaise_-Caramel-Dim-1692352582.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1689071588/crusader/variants/54000098-LE4017/Jonathan-Leather-Side-Left-Chaise_-Warm-Taupe-Front-1689071586.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1689071588/crusader/variants/54000098-LE4017/Jonathan-Leather-Side-Left-Chaise_-Warm-Taupe-Angle-1689071586.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1689071588/crusader/variants/54000098-LE4017/Jonathan-Leather-Side-Left-Chaise_-Warm-Taupe-Side-1689071586.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1689071588/crusader/variants/54000098-LE4017/Jonathan-Leather-Side-Left-Chaise_-Warm-Taupe-Back-1689071586.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691552620/crusader/variants/54000098-LE4017/Jonathan-Leather-Side-Left-Chaise_-Sofa-Taupe-Square-Set_1-1691552617.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691552620/crusader/variants/54000098-LE4017/Jonathan-Leather-Side-Left-Chaise-Sofa_-Taupe-Square-Set_3-1691552617.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691741959/crusader/variants/54000098-LE4017/Jonathan-Leather-Extended-Side-Left-Chaise-Sectional-Sofa-Taupe-Square-Set_4-1691741957.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691553076/crusader/variants/54000098-LE4017/Jonathan-Extended-3-Seater-Sofa-Taupe-Det_3-1691553074.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691553076/crusader/variants/54000098-LE4017/Jonathan-Sofa-Leather-Taupe-Det_10-1691553074.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691552508/crusader/variants/54000098-LE4017/Jonathan-Taupe-Texture-1691552505.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1689071735/crusader/variants/T54000098-LE/Jonathan-Leather-Side-Left-Chaise_-Warm-Taupe-Dim-1689071733.png"
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
        metadata: {
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692352560/crusader/variants/54000098-LE4016/Jonathan-Leather-Side-Left-Chaise_-Caramel-Front-1692352558.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692352561/crusader/variants/54000098-LE4016/Jonathan-Leather-Side-Left-Chaise_-Caramel-Angle-1692352558.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692352561/crusader/variants/54000098-LE4016/Jonathan-Leather-Side-Left-Chaise_-Caramel-Side-1692352558.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692352561/crusader/variants/54000098-LE4016/Jonathan-Leather-Side-Left-Chaise_-Caramel-Back-1692352558.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691552382/crusader/variants/54000098-LE4016/Jonathan-Leather-Left-Chaise-Sofa-Square-Set_2-1691552380.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691552383/crusader/variants/54000098-LE4016/Jonathan-Leather-Side-Left-Chaise-Sofa-Square-Set_2-1691552380.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691552382/crusader/variants/54000098-LE4016/Jonathan-Leather-Extended-Side-Left-Chaise-Sectional-Caramel-Square-Set_5-1691552380.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691552431/crusader/variants/54000098-LE4016/Jonathan-Sofa-Leather-Caramel-Det_7-1691552428.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691552431/crusader/variants/54000098-LE4016/Jonathan-Sofa-Leather-Caramel-Det_2-1691552429.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691552255/crusader/variants/54000098-LE4016/Jonathan-Texture-1691552252.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692352585/crusader/variants/T54000098-LE/Jonathan-Leather-Side-Left-Chaise_-Caramel-Dim-1692352582.png"
          ]
},
        prices: [
          {
            amount: 149900,
            currency_code: 'usd',
          },
          {
            amount: 149900,
            currency_code: 'usd',
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
        metadata: {
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1689071588/crusader/variants/54000098-LE4017/Jonathan-Leather-Side-Left-Chaise_-Warm-Taupe-Front-1689071586.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1689071588/crusader/variants/54000098-LE4017/Jonathan-Leather-Side-Left-Chaise_-Warm-Taupe-Angle-1689071586.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1689071588/crusader/variants/54000098-LE4017/Jonathan-Leather-Side-Left-Chaise_-Warm-Taupe-Side-1689071586.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1689071588/crusader/variants/54000098-LE4017/Jonathan-Leather-Side-Left-Chaise_-Warm-Taupe-Back-1689071586.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691552620/crusader/variants/54000098-LE4017/Jonathan-Leather-Side-Left-Chaise_-Sofa-Taupe-Square-Set_1-1691552617.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691552620/crusader/variants/54000098-LE4017/Jonathan-Leather-Side-Left-Chaise-Sofa_-Taupe-Square-Set_3-1691552617.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691741959/crusader/variants/54000098-LE4017/Jonathan-Leather-Extended-Side-Left-Chaise-Sectional-Sofa-Taupe-Square-Set_4-1691741957.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691553076/crusader/variants/54000098-LE4017/Jonathan-Extended-3-Seater-Sofa-Taupe-Det_3-1691553074.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691553076/crusader/variants/54000098-LE4017/Jonathan-Sofa-Leather-Taupe-Det_10-1691553074.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691552508/crusader/variants/54000098-LE4017/Jonathan-Taupe-Texture-1691552505.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1689071735/crusader/variants/T54000098-LE/Jonathan-Leather-Side-Left-Chaise_-Warm-Taupe-Dim-1689071733.png"
          ]
},
        prices: [
          {
            amount: 149900,
            currency_code: 'usd',
          },
          {
            amount: 149900,
            currency_code: 'usd',
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
    metadata: {
    "care": "Leather sofa",
    "filling": "Foam, fibre and pocket spring filled seat; Foam and fibre filled back",
    "cover_type": "Non-removable cover",
    "dimensions": "W139 x D100 x H70cm",
    "weight": "32.8kg",
    "seating_depth": "62cm",
    "seating_height": "41cm",
    "comfort_ratings": {
        "overall_sit_rating": "2",
        "seat_depth_rating": "4",
        "seat_height_rating": "3",
        "seat_softness_rating": "2"
    },
    "warranty": "Frame 10 years; Leather 1 year; Foam 2 years",
    "assembly": "Fully assembled"
},
    category_ids: [categories.find(c => c.name === "Modular Chaises")?.id, categories.find(c => c.name === "Sofa & Armchairs")?.id].filter((id): id is string => Boolean(id)),
    tag_ids: [tags.find(t => t.value === "storewide_sale")?.id, tags.find(t => t.value === "all furniture excluding accessories\t")?.id, tags.find(t => t.value === "storewide exclude beige covers")?.id, tags.find(t => t.value === "gss event storewide sale excluding gwp")?.id, tags.find(t => t.value === "all product excluding customisation")?.id, tags.find(t => t.value === "match & save")?.id, tags.find(t => t.value === "all products")?.id, tags.find(t => t.value === "modular_sofas")?.id, tags.find(t => t.value === "s3_event_tag")?.id, tags.find(t => t.value === "style_moderncontemporary")?.id].filter((id): id is string => Boolean(id)),
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
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692352649/crusader/variants/T54000099-LE/Jonathan-Leather-Side-Right-Chaise_-Caramel-Dim-1692352647.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1689071794/crusader/variants/54000099-LE4017/Jonathan-Leather-Side-Right-Chaise-Warm-Taupe-Front-1689071791.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1689071793/crusader/variants/54000099-LE4017/Jonathan-Leather-Side-Right-Chaise-Warm-Taupe-Angle-1689071791.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1689071794/crusader/variants/54000099-LE4017/Jonathan-Leather-Side-Right-Chaise--Warm-Taupe-Side-1689071791.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1689071793/crusader/variants/54000099-LE4017/Jonathan-Leather-Side-Right-Chaise-Warm-Taupe-Back-1689071791.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691741870/crusader/variants/54000099-LE4017/Jonathan-Leather-Side-Right-Chaise_-Sofa-Taupe-Square-Set_1-1691741867.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691553491/crusader/variants/54000099-LE4017/Jonathan-Leather-Side-Right-Chaise-Sofa_-Taupe-Square-Set_3-1691553488.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691741925/crusader/variants/54000099-LE4017/Jonathan-Leather-Extended-Side-Right-Chaise-Sectional-Sofa-Taupe-Square-Set_4-1691741923.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691553491/crusader/variants/54000099-LE4017/Jonathan-Leather-Side-Right-Chaise-Sectional-Sofa-Taupe-Det_1-1691553488.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691553360/crusader/variants/54000099-LE4017/Jonathan-Taupe-Texture-1691553358.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1689071970/crusader/variants/T54000099-LE/Jonathan-Leather-Side-Right-Chaise-Warm-Taupe-Dim-1689071968.png"
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
        metadata: {
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692352622/crusader/variants/54000099-LE4016/Jonathan-Leather-Side-Right-Chaise_-Caramel-Front-1692352619.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691553230/crusader/variants/54000099-LE4016/Jonathan-Leather-Right-Chaise-Sofa-Square-Set_2-1691553227.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691553230/crusader/variants/54000099-LE4016/Jonathan-Leather-Side-Right-Chaise-Sofa-Square-Set_2-1691553227.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691553276/crusader/variants/54000099-LE4016/Jonathan-Leather-Extended-Side-Right-Chaise-Sectional-Caramel-Square-Set_5-1691553273.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691553318/crusader/variants/54000099-LE4016/Jonathan-Sofa-Leather-Caramel-Det_7-1691553315.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691553317/crusader/variants/54000099-LE4016/Jonathan-Sofa-Leather-Caramel-Det_2-1691553315.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691553334/crusader/variants/54000099-LE4016/Jonathan-Texture-1691553331.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692352621/crusader/variants/54000099-LE4016/Jonathan-Leather-Side-Right-Chaise_-Caramel-Angle-1692352619.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692352621/crusader/variants/54000099-LE4016/Jonathan-Leather-Side-Right-Chaise_-Caramel-Side-1692352619.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692352622/crusader/variants/54000099-LE4016/Jonathan-Leather-Side-Right-Chaise_-Caramel-Back-1692352619.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692352649/crusader/variants/T54000099-LE/Jonathan-Leather-Side-Right-Chaise_-Caramel-Dim-1692352647.png"
          ]
},
        prices: [
          {
            amount: 149900,
            currency_code: 'usd',
          },
          {
            amount: 149900,
            currency_code: 'usd',
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
        metadata: {
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1689071794/crusader/variants/54000099-LE4017/Jonathan-Leather-Side-Right-Chaise-Warm-Taupe-Front-1689071791.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1689071793/crusader/variants/54000099-LE4017/Jonathan-Leather-Side-Right-Chaise-Warm-Taupe-Angle-1689071791.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1689071794/crusader/variants/54000099-LE4017/Jonathan-Leather-Side-Right-Chaise--Warm-Taupe-Side-1689071791.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1689071793/crusader/variants/54000099-LE4017/Jonathan-Leather-Side-Right-Chaise-Warm-Taupe-Back-1689071791.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691741870/crusader/variants/54000099-LE4017/Jonathan-Leather-Side-Right-Chaise_-Sofa-Taupe-Square-Set_1-1691741867.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691553491/crusader/variants/54000099-LE4017/Jonathan-Leather-Side-Right-Chaise-Sofa_-Taupe-Square-Set_3-1691553488.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691741925/crusader/variants/54000099-LE4017/Jonathan-Leather-Extended-Side-Right-Chaise-Sectional-Sofa-Taupe-Square-Set_4-1691741923.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691553491/crusader/variants/54000099-LE4017/Jonathan-Leather-Side-Right-Chaise-Sectional-Sofa-Taupe-Det_1-1691553488.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691553360/crusader/variants/54000099-LE4017/Jonathan-Taupe-Texture-1691553358.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1689071970/crusader/variants/T54000099-LE/Jonathan-Leather-Side-Right-Chaise-Warm-Taupe-Dim-1689071968.png"
          ]
},
        prices: [
          {
            amount: 149900,
            currency_code: 'usd',
          },
          {
            amount: 149900,
            currency_code: 'usd',
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
    metadata: {
    "material": "Body: engineered wood with acacia veneer; Leg: solid acacia wood",
    "care": "Storage furniture",
    "dimensions": "W180 x D45 x H82cm",
    "weight": "87kg",
    "warranty": "5-year limited warranty",
    "assembly": "Legs to be fitted"
},
    category_ids: [categories.find(c => c.name === "Sideboards")?.id, categories.find(c => c.name === "Storage")?.id].filter((id): id is string => Boolean(id)),
    tag_ids: [tags.find(t => t.value === "bestsellers")?.id, tags.find(t => t.value === "storewide_sale")?.id, tags.find(t => t.value === "all furniture excluding accessories\t")?.id, tags.find(t => t.value === "storewide exclude beige covers")?.id, tags.find(t => t.value === "gss event storewide sale excluding gwp")?.id, tags.find(t => t.value === "all product excluding customisation")?.id, tags.find(t => t.value === "match & save")?.id, tags.find(t => t.value === "all_sideboard")?.id, tags.find(t => t.value === "all products")?.id, tags.find(t => t.value === "acacia_wood")?.id, tags.find(t => t.value === "furniture_with_storage")?.id, tags.find(t => t.value === "s3_event_tag")?.id, tags.find(t => t.value === "style_modernfarmhouse")?.id, tags.find(t => t.value === "sofa_bundle_complementary_products")?.id, tags.find(t => t.value === "sideboard")?.id].filter((id): id is string => Boolean(id)),
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
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1689154005/crusader/variants/T40550217/Casa-Sideboard-Dim-1689154002.png"
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
        metadata: {
          "safety_tip": "Anti-tip prevention",
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1689073156/crusader/variants/40550217/Casa-Sideboard-Front-1689073153.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1689073156/crusader/variants/40550217/Casa-Sideboard-Front_1-1689073153.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1689073156/crusader/variants/40550217/Casa-Sideboard-Angle-1689073153.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1689073155/crusader/variants/40550217/Casa-Sideboard-Side-1689073153.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1689073156/crusader/variants/40550217/Casa-Sideboard-Back-1689073153.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692345583/crusader/variants/40550217/Casa-Sideboard-Square-Set_1-1692345581.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692345906/crusader/variants/40550217/Casa-Sideboard-Square-Set_3-1692345903.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692605325/crusader/variants/40550217/Casa-Sideboard-Square-Det_4-1692605322.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692426202/crusader/variants/40550217/Casa-Sideboard-Square-Det_3-1692426200.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1689153850/crusader/variants/40550217/Casa-Sideboard-Square-Det_6-1689153847.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1689154005/crusader/variants/T40550217/Casa-Sideboard-Dim-1689154002.png"
          ]
},
        prices: [
          {
            amount: 129900,
            currency_code: 'usd',
          },
          {
            amount: 129900,
            currency_code: 'usd',
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
    metadata: {
    "material": "Body: engineered wood with acacia veneer; Leg: solid acacia wood",
    "care": "Storage furniture",
    "dimensions": "W200 x D45 x H59cm",
    "weight": "66kg",
    "warranty": "5-year limited warranty",
    "assembly": "Legs to be fitted"
},
    category_ids: [categories.find(c => c.name === "TV Consoles")?.id, categories.find(c => c.name === "Storage")?.id].filter((id): id is string => Boolean(id)),
    tag_ids: [tags.find(t => t.value === "s3'25 products")?.id, tags.find(t => t.value === "small_space_furniture")?.id, tags.find(t => t.value === "new")?.id, tags.find(t => t.value === "storewide_sale")?.id].filter((id): id is string => Boolean(id)),
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
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1755071996/crusader/variants/T40550220/Casa-TV-Console-150cm-Dim-1755071994.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1689156425/crusader/variants/40550220/Casa-TV-Console-Front-1689156422.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1689156424/crusader/variants/40550220/Casa-TV-Console-Front_1-1689156422.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1689156425/crusader/variants/40550220/Casa-TV-Console-Angle-1689156422.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1689156424/crusader/variants/40550220/Casa-TV-Console-Side-1689156422.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1689156424/crusader/variants/40550220/Casa-TV-Console-Back-1689156422.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692426584/crusader/variants/40550220/Casa-TV-Console-Square-Set_5-1692426581.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1689157022/crusader/variants/T40550220/Casa-TV-Console-Dim-1689157019.png"
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
        metadata: {
          "safety_tip": "Anti-tip prevention",
          "drawer_mechanism": "Ball bearing side guide",
          "general_dimensions": "W150 x D45 x H59cm",
          "drawer_capacity": "2 x W45 x D32 x H9cm",
          "product_weight": "55kg",
          "cupboard_capacity": "4 x W45 x D32 x H11cm",
          "shelves_height": "14.5cm",
          "max_bearing_support": "100kg",
          "levellers": "Included",
          "packaging_dimensions": "1 box",
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1756455117/crusader/variants/40550345/Casa-TV-Console-150cm-Front-1756455114.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1756455116/crusader/variants/40550345/Casa-TV-Console-150cm-Angle-1756455114.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1756455117/crusader/variants/40550345/Casa-TV-Console-150cm-Side-1756455114.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1756455117/crusader/variants/40550345/Casa-TV-Console-150cm-Back-1756455114.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1756447589/crusader/variants/40550345/Casa-TV-Console-150cm-Square-Set_1-1756447587.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692349090/crusader/variants/40550220/Casa-TV-Console-Square-Set_1-1692349088.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692758876/crusader/variants/40550220/Casa-TV-Console-Square-Set_6-1692758873.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692426704/crusader/variants/40550220/Casa-TV-Console-Square-Det_2-1692426702.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1689156911/crusader/variants/40550220/Casa-TV-Console-Square-Det_5-1689156908.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1689156910/crusader/variants/40550220/Casa-TV-Console-Square-Det_6-1689156908.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1755071996/crusader/variants/T40550220/Casa-TV-Console-150cm-Dim-1755071994.png"
          ]
},
        prices: [
          {
            amount: 89900,
            currency_code: 'usd',
          },
          {
            amount: 89900,
            currency_code: 'usd',
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
        metadata: {
          "safety_tip": "Anti-tip prevention",
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1689156425/crusader/variants/40550220/Casa-TV-Console-Front-1689156422.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1689156424/crusader/variants/40550220/Casa-TV-Console-Front_1-1689156422.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1689156425/crusader/variants/40550220/Casa-TV-Console-Angle-1689156422.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1689156424/crusader/variants/40550220/Casa-TV-Console-Side-1689156422.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1689156424/crusader/variants/40550220/Casa-TV-Console-Back-1689156422.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692349090/crusader/variants/40550220/Casa-TV-Console-Square-Set_1-1692349088.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692426584/crusader/variants/40550220/Casa-TV-Console-Square-Set_5-1692426581.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692758876/crusader/variants/40550220/Casa-TV-Console-Square-Set_6-1692758873.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692426704/crusader/variants/40550220/Casa-TV-Console-Square-Det_2-1692426702.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1689156911/crusader/variants/40550220/Casa-TV-Console-Square-Det_5-1689156908.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1689156910/crusader/variants/40550220/Casa-TV-Console-Square-Det_6-1689156908.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1689157022/crusader/variants/T40550220/Casa-TV-Console-Dim-1689157019.png"
          ]
},
        prices: [
          {
            amount: 119900,
            currency_code: 'usd',
          },
          {
            amount: 119900,
            currency_code: 'usd',
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
    metadata: {
    "material": "Body: engineered wood with acacia veneer; Leg: solid acacia wood",
    "care": "Wooden table",
    "dimensions": "W120 x D40 x H82cm",
    "weight": "35kg",
    "warranty": "5-year limited warranty",
    "assembly": "Legs to be fitted"
},
    category_ids: [categories.find(c => c.name === "Tables")?.id, categories.find(c => c.name === "Console Tables")?.id].filter((id): id is string => Boolean(id)),
    tag_ids: [tags.find(t => t.value === "bestsellers")?.id, tags.find(t => t.value === "storewide_sale")?.id, tags.find(t => t.value === "all furniture excluding accessories\t")?.id, tags.find(t => t.value === "storewide exclude beige covers")?.id, tags.find(t => t.value === "gss event storewide sale excluding gwp")?.id, tags.find(t => t.value === "all product excluding customisation")?.id, tags.find(t => t.value === "match & save")?.id, tags.find(t => t.value === "all products")?.id, tags.find(t => t.value === "acacia_wood")?.id, tags.find(t => t.value === "s3_event_tag")?.id, tags.find(t => t.value === "style_modernfarmhouse")?.id].filter((id): id is string => Boolean(id)),
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
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1689233921/crusader/variants/T40550223/Casa-Console-Table-Dim-1689233919.png"
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
        metadata: {
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1711532302/crusader/variants/40550223/Casa-Console-Table-Angle-1711532300.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1711532302/crusader/variants/40550223/Casa-Console-Table-Angle1-1711532299.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1711532302/crusader/variants/40550223/Casa-Console-Table-Front-1711532300.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1711532302/crusader/variants/40550223/Casa-Console-Table-Side-1711532299.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692430819/crusader/variants/40550223/Casa-Console-Table-Square-Set_4-1692430817.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692606096/crusader/variants/40550223/Casa-Console-Table-Square-Set_2-1692606093.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1689232712/crusader/variants/40550223/Casa-Console-Table-Square-Det_2-1689232710.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1689232712/crusader/variants/40550223/Casa-Console-Table-Square-Det_1-1689232710.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692606111/crusader/variants/40550223/Casa-Dining-Table-Square-Det_1-1692606108.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1689233921/crusader/variants/T40550223/Casa-Console-Table-Dim-1689233919.png"
          ]
},
        prices: [
          {
            amount: 59900,
            currency_code: 'usd',
          },
          {
            amount: 59900,
            currency_code: 'usd',
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
    metadata: {
    "material": "Engineered wood with mindi veneer, solid wood mindi frames; Engineered wood with mappa burl veneer on front drawer",
    "care": "Storage furniture",
    "dimensions": "W61 x D45 x H60cm",
    "weight": "25.92kg",
    "warranty": "5-year limited warranty",
    "assembly": "Fully assembled"
},
    category_ids: [categories.find(c => c.name === "Bedside Tables")?.id, categories.find(c => c.name === "Storage")?.id].filter((id): id is string => Boolean(id)),
    tag_ids: [tags.find(t => t.value === "le.anne")?.id, tags.find(t => t.value === "bestsellers")?.id, tags.find(t => t.value === "storewide_sale")?.id, tags.find(t => t.value === "small_bedroom_furniture")?.id, tags.find(t => t.value === "small_space_furniture")?.id, tags.find(t => t.value === "trade_side_tables")?.id, tags.find(t => t.value === "all furniture excluding accessories\t")?.id, tags.find(t => t.value === "storewide exclude beige covers")?.id, tags.find(t => t.value === "gss event storewide sale excluding gwp")?.id, tags.find(t => t.value === "all product excluding customisation")?.id, tags.find(t => t.value === "curved_furniture")?.id, tags.find(t => t.value === "match & save")?.id, tags.find(t => t.value === "rounded_furniture")?.id, tags.find(t => t.value === "all_bedside_side_table")?.id, tags.find(t => t.value === "all products")?.id].filter((id): id is string => Boolean(id)),
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
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1696933589/crusader/variants/T40280045/Crescent-1-Drawer-Nightstand-Dim-1696933587.png"
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
        metadata: {
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1696932993/crusader/variants/40280045/Crescent-1-Drawer-Nightstand-Front-1696932991.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1696932993/crusader/variants/40280045/Crescent-1-Drawer-Nightstand-Angle-1696932991.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1696932993/crusader/variants/40280045/Crescent-1-Drawer-Nightstand-Side-1696932991.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1696932993/crusader/variants/40280045/Crescent-1-Drawer-Nightstand-Back-1696932991.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1697772652/crusader/variants/40280045/Crescent-1-Drawer-Nightstand-Square-Set_4-1697772649.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1697772796/crusader/variants/40280045/Crescent-1-Drawer-Nightstand-Square-Set_3-1697772793.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1698633733/crusader/variants/PB-001230/Cresent-Bed-With-2-1-Drawer-Nightstand-Square-Set_1-1698633730.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1697772699/crusader/variants/40280045/Dawson-non-storage-bed-Seagull-Square-Set_2-1697772696.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1697772652/crusader/variants/40280045/Crescent-1-Drawer-Nightstand-Square-Det_1-1697772649.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1697622987/crusader/variants/40280045/Crescent-1-Drawer-Nightstand-With-2-Drawer-Nightstand-1697622984.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1696933397/crusader/variants/40280045/Crescent-2-Drawer-Nightstand-Square-Det_1-1696933394.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1731308875/crusader/variants/40280045/Crescent-6-Drawer-Dresser-Square-Det_10-1731308872.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1696933589/crusader/variants/T40280045/Crescent-1-Drawer-Nightstand-Dim-1696933587.png"
          ]
},
        prices: [
          {
            amount: 59900,
            currency_code: 'usd',
          },
          {
            amount: 59900,
            currency_code: 'usd',
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
    metadata: {
    "material": "Frame: solid rubber wood; Seat: woven paper cord",
    "care": "Woven and cane seating",
    "dimensions": "W62 x D53 x H76cm",
    "weight": "6.43kg (per chair)",
    "seating_depth": "47cm",
    "seating_height": "45.5cm",
    "warranty": "10-year limited warranty",
    "assembly": "Fully assembled"
},
    category_ids: [categories.find(c => c.name === "Chairs & Benches")?.id, categories.find(c => c.name === "Dining Chairs")?.id].filter((id): id is string => Boolean(id)),
    tag_ids: [tags.find(t => t.value === "storewide_sale")?.id, tags.find(t => t.value === "all furniture excluding accessories\t")?.id, tags.find(t => t.value === "storewide exclude beige covers")?.id, tags.find(t => t.value === "gss event storewide sale excluding gwp")?.id, tags.find(t => t.value === "all product excluding customisation")?.id, tags.find(t => t.value === "match & save")?.id, tags.find(t => t.value === "all_indoor_dining_chair")?.id, tags.find(t => t.value === "all products")?.id, tags.find(t => t.value === "style_midcenturymodern")?.id].filter((id): id is string => Boolean(id)),
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
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1696935415/crusader/variants/T54000149/Austen-Dining-Chair-White-Wash-Dim-1696935413.png"
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
        metadata: {
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1696935038/crusader/variants/54000149-WW/Austen-Dining-Chair-White-Wash-Angle-1696935036.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1696935038/crusader/variants/54000149-WW/Austen-Dining-Chair-White-Wash-Front-1696935036.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1696935038/crusader/variants/54000149-WW/Austen-Dining-Chair-White-Wash-Side-1696935036.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1696935038/crusader/variants/54000149-WW/Austen-Dining-Chair-White-Wash-Back-1696935036.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1700453305/crusader/variants/54000149-WW/Austen-Dining-Arm-Chair-White-Wash-Square-Set_4-1700453303.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1700453306/crusader/variants/54000149-WW/Austen-Dining-Arm-Chair-White-Wash-Square-Set_1-1700453303.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1700453306/crusader/variants/54000149-WW/Austen-Dining-Arm-Chair-White-Wash-Square-Set_3-1700453303.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1700453464/crusader/variants/54000149-WW/Austen-Dining-Arm-Chair-White-Wash-Square-Det_3-1700453461.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1700453130/crusader/variants/54000149-WW/Austen-Dining-Arm-Chair-Walnut-With-Arm-Dining-Chair-White-Square-Set_1-1700453127.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1696935102/crusader/variants/54000149-WW/Austen-Dining-Arm-Chair-White-Wash-Square-Det_1-1696935100.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1696935182/crusader/variants/54000149-WW/Austen-Dining-Arm-Chair-White-Wash-Square-Det_4-1696935180.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1696935415/crusader/variants/T54000149/Austen-Dining-Chair-White-Wash-Dim-1696935413.png"
          ]
},
        prices: [
          {
            amount: 34900,
            currency_code: 'usd',
          },
          {
            amount: 34900,
            currency_code: 'usd',
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
    metadata: {
    "care": "Leather sofa",
    "filling": "Foam, fibre and pocket spring filled seat; Foam and fibre filled back",
    "cover_type": "Non-removable cover",
    "dimensions": "W341 x D100 x H70cm",
    "weight": "87.6kg",
    "seating_depth": "62cm",
    "seating_height": "41cm",
    "comfort_ratings": {
        "overall_sit_rating": "2",
        "seat_depth_rating": "4",
        "seat_height_rating": "3",
        "seat_softness_rating": "2"
    },
    "warranty": "Frame 10 years; Leather 1 year; Foam 2 years",
    "assembly": "Fully assembled"
},
    category_ids: [categories.find(c => c.name === "Extended 3 Seater Sofas")?.id, categories.find(c => c.name === "Sofa & Armchairs")?.id].filter((id): id is string => Boolean(id)),
    tag_ids: [tags.find(t => t.value === "storewide_sale")?.id, tags.find(t => t.value === "all furniture excluding accessories\t")?.id, tags.find(t => t.value === "storewide exclude beige covers")?.id, tags.find(t => t.value === "gss event storewide sale excluding gwp")?.id, tags.find(t => t.value === "all product excluding customisation")?.id, tags.find(t => t.value === "match & save")?.id, tags.find(t => t.value === "all products")?.id, tags.find(t => t.value === "modular_sofas")?.id, tags.find(t => t.value === "s3_event_tag")?.id, tags.find(t => t.value === "style_moderncontemporary")?.id, tags.find(t => t.value === "s3_event (do not use)")?.id, tags.find(t => t.value === "all_sofa")?.id].filter((id): id is string => Boolean(id)),
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
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692353656/crusader/variants/TAS-000386/Jonathan-Leather-Extended-Side-Left-Chaise-Sofa-_Caramel-Dim-1692353654.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692353607/crusader/variants/AS-000387-LE4016/Jonathan-Leather-Extended-Side-Right-Chaise-Sofa-_Caramel-Front-1692353605.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692353607/crusader/variants/AS-000387-LE4016/Jonathan-Leather-Extended-Side-Right-Chaise-Sofa-_Caramel-Angle-1692353605.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692353607/crusader/variants/AS-000387-LE4016/Jonathan-Leather-Extended-Side-Right-Chaise-Sofa-_Caramel-Side-1692353605.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692353608/crusader/variants/AS-000387-LE4016/Jonathan-Leather-Extended-Side-Right-Chaise-Sofa-_Caramel-Back-1692353605.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691568318/crusader/variants/AS-000387-LE4016/Jonathan-Leather-Extended-Side-Right-Chaise-Sofa-With-Ottoman-Caramel-Square-Set_2-1691568316.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691568318/crusader/variants/AS-000387-LE4016/Jonathan-Leather-Extended-Side-Right-Chaise-Sofa-With-Ottoman-Caramel-Square-Set_4-1691568316.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691568319/crusader/variants/AS-000387-LE4016/Jonathan-Leather-Right-Chaise-Sofa-Caramel-Square-Det_1-1691568316.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691568319/crusader/variants/AS-000387-LE4016/Jonathan-Leather-Side-Right-Chaise-Sectional-Caramel-Square-Det_1-1691568316.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691568345/crusader/variants/AS-000387-LE4016/Jonathan-Sofa-Leather-Caramel-Det_7-1691568343.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691568345/crusader/variants/AS-000387-LE4016/Jonathan-Sofa-Leather-Caramel-Det_2__1_-1691568343.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691568359/crusader/variants/AS-000387-LE4016/Jonathan-Texture-1691568356.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692353656/crusader/variants/TAS-000386/Jonathan-Leather-Extended-Side-Right-Chaise-Sofa-_Caramel-Dim-1692353654.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691568671/crusader/variants/AS-000386-LE4017/Jonathan-Leather-Extended-Side-Left-Chaise-Sofa-Warm-Taupe-Front-1691568668.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691568670/crusader/variants/AS-000386-LE4017/Jonathan-Leather-Extended-Side-Left-Chaise-Sofa-_Warm-Taupe-Side-1691568668.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691568671/crusader/variants/AS-000386-LE4017/Jonathan-Leather-Extended-Side-Left-Chaise-Sofa-_Warm-Taupe-Angle-1691568668.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691568670/crusader/variants/AS-000386-LE4017/Jonathan-Leather-Extended-Side-Left-Chaise-Sofa-_Warm-Taupe-Back-1691568668.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691568742/crusader/variants/AS-000386-LE4017/Jonathan-Leather-Extended-Side-Left-Chaise-Sofa-_Taupe-Square-Set_2-1691568739.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691568742/crusader/variants/AS-000386-LE4017/Jonathan-Leather-Extended-Side-Left-Chaise-Sofa-_Taupe-Square-Set_5-1691568739.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691568742/crusader/variants/AS-000386-LE4017/Jonathan-Leather-L-Shape-Sectional-Sofa-Taupe-Det_1-1691568739.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691568742/crusader/variants/AS-000386-LE4017/Jonathan-Leather-Side-Left-Chaise-Sectional-Sofa-Taupe-Det_1-1691568739.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691568632/crusader/variants/AS-000386-LE4017/Jonathan-Extended-3-Seater-Sofa-Taupe-Det_3-1691568630.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691568632/crusader/variants/AS-000386-LE4017/Jonathan-Sofa-Leather-Taupe-Det_10__1_-1691568630.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691568407/crusader/variants/AS-000386-LE4017/Jonathan-Taupe-Texture-1691568404.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691569440/crusader/variants/TAS-000386/Jonathan-Leather-Extended-Side-Left-Chaise-Sofa-Warm-Taupe-Dim-1691569438.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691569209/crusader/variants/AS-000387-LE4017/Jonathan-Leather-Extended-Side-Right-Chaise-Sofa-Warm-Taupe-Front-1691569207.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691569209/crusader/variants/AS-000387-LE4017/Jonathan-Leather-Extended-Side-Right-Chaise-Sofa-_Warm-Taupe-Angle-1691569207.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691569209/crusader/variants/AS-000387-LE4017/Jonathan-Leather-Extended-Side-Right-Chaise-Sofa-_Warm-Taupe-Side-1691569207.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691569209/crusader/variants/AS-000387-LE4017/Jonathan-Leather-Extended-Side-Right-Chaise-Sofa-_Warm-Taupe-Back-1691569207.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691568933/crusader/variants/AS-000387-LE4017/Jonathan-Leather-Extended-Side-Right-Chaise-Sofa-_Taupe-Square-Set_2-1691568931.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691568933/crusader/variants/AS-000387-LE4017/Jonathan-Leather-Extended-Side-Right-Chaise-Sofa-_Taupe-Square-Set_5-1691568931.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691569098/crusader/variants/AS-000387-LE4017/Jonathan-Leather-L-Shape-Sectional-Sofa-Taupe-Det_1-1691569095.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691568933/crusader/variants/AS-000387-LE4017/Jonathan-Leather-Side-Right-Chaise-Sectional-Sofa-Taupe-Det_1-1691568931.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691569136/crusader/variants/AS-000387-LE4017/Jonathan-Extended-3-Seater-Sofa-Taupe-Det_3-1691569134.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691569136/crusader/variants/AS-000387-LE4017/Jonathan-Sofa-Leather-Taupe-Det_10__1_-1691569133.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691569116/crusader/variants/AS-000387-LE4017/Jonathan-Taupe-Texture-1691569114.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691569441/crusader/variants/TAS-000386/Jonathan-Leather-Extended-Side-Right-Chaise-Sofa-Warm-Taupe-Dim-1691569438.png"
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
        metadata: {
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692353534/crusader/variants/AS-000386-LE4016/Jonathan-Leather-Extended-Side-Left-Chaise-Sofa-_Caramel-Front-1692353532.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692353535/crusader/variants/AS-000386-LE4016/Jonathan-Leather-Extended-Side-Left-Chaise-Sofa-_Caramel-Angle-1692353532.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692353534/crusader/variants/AS-000386-LE4016/Jonathan-Leather-Extended-Side-Left-Chaise-Sofa-_Caramel-Side-1692353532.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692353535/crusader/variants/AS-000386-LE4016/Jonathan-Leather-Extended-Side-Left-Chaise-Sofa-_Caramel-Back-1692353532.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691568226/crusader/variants/AS-000386-LE4016/Jonathan-Leather-Extended-Side-Left-Chaise-Sofa-With-Ottoman-Caramel-Square-Set_2-1691568224.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691568227/crusader/variants/AS-000386-LE4016/Jonathan-Leather-Extended-Side-Left-Chaise-Sofa-With-Ottoman-Caramel-Square-Set_4-1691568224.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691568227/crusader/variants/AS-000386-LE4016/Jonathan-Leather-Left-Chaise-Sofa-Caramel-Square-Det_1-1691568224.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691568226/crusader/variants/AS-000386-LE4016/Jonathan-Leather-Side-Left-Chaise-Sectional-Caramel-Square-Det_1-1691568224.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691568125/crusader/variants/AS-000386-LE4016/Jonathan-Sofa-Leather-Caramel-Det_7-1691568122.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691568109/crusader/variants/AS-000386-LE4016/Jonathan-Sofa-Leather-Caramel-Det_2__1_-1691568107.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691568095/crusader/variants/AS-000386-LE4016/Jonathan-Texture-1691568093.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692353656/crusader/variants/TAS-000386/Jonathan-Leather-Extended-Side-Left-Chaise-Sofa-_Caramel-Dim-1692353654.png"
          ]
},
        prices: [
          {
            amount: 374700,
            currency_code: 'usd',
          },
          {
            amount: 374700,
            currency_code: 'usd',
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
        metadata: {
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692353607/crusader/variants/AS-000387-LE4016/Jonathan-Leather-Extended-Side-Right-Chaise-Sofa-_Caramel-Front-1692353605.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692353607/crusader/variants/AS-000387-LE4016/Jonathan-Leather-Extended-Side-Right-Chaise-Sofa-_Caramel-Angle-1692353605.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692353607/crusader/variants/AS-000387-LE4016/Jonathan-Leather-Extended-Side-Right-Chaise-Sofa-_Caramel-Side-1692353605.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692353608/crusader/variants/AS-000387-LE4016/Jonathan-Leather-Extended-Side-Right-Chaise-Sofa-_Caramel-Back-1692353605.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691568318/crusader/variants/AS-000387-LE4016/Jonathan-Leather-Extended-Side-Right-Chaise-Sofa-With-Ottoman-Caramel-Square-Set_2-1691568316.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691568318/crusader/variants/AS-000387-LE4016/Jonathan-Leather-Extended-Side-Right-Chaise-Sofa-With-Ottoman-Caramel-Square-Set_4-1691568316.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691568319/crusader/variants/AS-000387-LE4016/Jonathan-Leather-Right-Chaise-Sofa-Caramel-Square-Det_1-1691568316.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691568319/crusader/variants/AS-000387-LE4016/Jonathan-Leather-Side-Right-Chaise-Sectional-Caramel-Square-Det_1-1691568316.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691568345/crusader/variants/AS-000387-LE4016/Jonathan-Sofa-Leather-Caramel-Det_7-1691568343.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691568345/crusader/variants/AS-000387-LE4016/Jonathan-Sofa-Leather-Caramel-Det_2__1_-1691568343.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691568359/crusader/variants/AS-000387-LE4016/Jonathan-Texture-1691568356.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692353656/crusader/variants/TAS-000386/Jonathan-Leather-Extended-Side-Right-Chaise-Sofa-_Caramel-Dim-1692353654.png"
          ]
},
        prices: [
          {
            amount: 374700,
            currency_code: 'usd',
          },
          {
            amount: 374700,
            currency_code: 'usd',
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
        metadata: {
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691568671/crusader/variants/AS-000386-LE4017/Jonathan-Leather-Extended-Side-Left-Chaise-Sofa-Warm-Taupe-Front-1691568668.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691568670/crusader/variants/AS-000386-LE4017/Jonathan-Leather-Extended-Side-Left-Chaise-Sofa-_Warm-Taupe-Side-1691568668.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691568671/crusader/variants/AS-000386-LE4017/Jonathan-Leather-Extended-Side-Left-Chaise-Sofa-_Warm-Taupe-Angle-1691568668.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691568670/crusader/variants/AS-000386-LE4017/Jonathan-Leather-Extended-Side-Left-Chaise-Sofa-_Warm-Taupe-Back-1691568668.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691568742/crusader/variants/AS-000386-LE4017/Jonathan-Leather-Extended-Side-Left-Chaise-Sofa-_Taupe-Square-Set_2-1691568739.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691568742/crusader/variants/AS-000386-LE4017/Jonathan-Leather-Extended-Side-Left-Chaise-Sofa-_Taupe-Square-Set_5-1691568739.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691568742/crusader/variants/AS-000386-LE4017/Jonathan-Leather-L-Shape-Sectional-Sofa-Taupe-Det_1-1691568739.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691568742/crusader/variants/AS-000386-LE4017/Jonathan-Leather-Side-Left-Chaise-Sectional-Sofa-Taupe-Det_1-1691568739.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691568632/crusader/variants/AS-000386-LE4017/Jonathan-Extended-3-Seater-Sofa-Taupe-Det_3-1691568630.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691568632/crusader/variants/AS-000386-LE4017/Jonathan-Sofa-Leather-Taupe-Det_10__1_-1691568630.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691568407/crusader/variants/AS-000386-LE4017/Jonathan-Taupe-Texture-1691568404.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691569440/crusader/variants/TAS-000386/Jonathan-Leather-Extended-Side-Left-Chaise-Sofa-Warm-Taupe-Dim-1691569438.png"
          ]
},
        prices: [
          {
            amount: 374700,
            currency_code: 'usd',
          },
          {
            amount: 374700,
            currency_code: 'usd',
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
        metadata: {
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691569209/crusader/variants/AS-000387-LE4017/Jonathan-Leather-Extended-Side-Right-Chaise-Sofa-Warm-Taupe-Front-1691569207.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691569209/crusader/variants/AS-000387-LE4017/Jonathan-Leather-Extended-Side-Right-Chaise-Sofa-_Warm-Taupe-Angle-1691569207.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691569209/crusader/variants/AS-000387-LE4017/Jonathan-Leather-Extended-Side-Right-Chaise-Sofa-_Warm-Taupe-Side-1691569207.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691569209/crusader/variants/AS-000387-LE4017/Jonathan-Leather-Extended-Side-Right-Chaise-Sofa-_Warm-Taupe-Back-1691569207.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691568933/crusader/variants/AS-000387-LE4017/Jonathan-Leather-Extended-Side-Right-Chaise-Sofa-_Taupe-Square-Set_2-1691568931.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691568933/crusader/variants/AS-000387-LE4017/Jonathan-Leather-Extended-Side-Right-Chaise-Sofa-_Taupe-Square-Set_5-1691568931.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691569098/crusader/variants/AS-000387-LE4017/Jonathan-Leather-L-Shape-Sectional-Sofa-Taupe-Det_1-1691569095.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691568933/crusader/variants/AS-000387-LE4017/Jonathan-Leather-Side-Right-Chaise-Sectional-Sofa-Taupe-Det_1-1691568931.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691569136/crusader/variants/AS-000387-LE4017/Jonathan-Extended-3-Seater-Sofa-Taupe-Det_3-1691569134.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691569136/crusader/variants/AS-000387-LE4017/Jonathan-Sofa-Leather-Taupe-Det_10__1_-1691569133.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691569116/crusader/variants/AS-000387-LE4017/Jonathan-Taupe-Texture-1691569114.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691569441/crusader/variants/TAS-000386/Jonathan-Leather-Extended-Side-Right-Chaise-Sofa-Warm-Taupe-Dim-1691569438.png"
          ]
},
        prices: [
          {
            amount: 374700,
            currency_code: 'usd',
          },
          {
            amount: 374700,
            currency_code: 'usd',
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
    metadata: {
    "care": "Fabric sofa, metal legs",
    "filling": "Foam, fibre and pocket spring filled seat; Fibre filled back",
    "cover_type": "Removable cushion covers",
    "dimensions": "W203.5 x D100 x H82cm",
    "weight": "55.4kg",
    "seating_depth": "60cm",
    "seating_height": "42cm",
    "comfort_ratings": {
        "overall_sit_rating": "2",
        "seat_depth_rating": "4",
        "seat_height_rating": "3",
        "seat_softness_rating": "2"
    },
    "warranty": "Frame 10 years; Fabric 1 year; Foam 2 years",
    "assembly": "Legs to be fitted"
},
    category_ids: [categories.find(c => c.name === "3 Seater Sofas")?.id, categories.find(c => c.name === "Sofa & Armchairs")?.id].filter((id): id is string => Boolean(id)),
    tag_ids: [tags.find(t => t.value === "sale")?.id, tags.find(t => t.value === "bestsellers")?.id, tags.find(t => t.value === "storewide_sale")?.id, tags.find(t => t.value === "small_living_room_furniture")?.id, tags.find(t => t.value === "small_space_furniture")?.id, tags.find(t => t.value === "all furniture excluding accessories\t")?.id, tags.find(t => t.value === "storewide exclude beige covers")?.id, tags.find(t => t.value === "gss event storewide sale excluding gwp")?.id, tags.find(t => t.value === "all product excluding customisation")?.id, tags.find(t => t.value === "match & save")?.id, tags.find(t => t.value === "all products")?.id, tags.find(t => t.value === "style_moderncontemporary")?.id, tags.find(t => t.value === "s3_event (do not use)")?.id, tags.find(t => t.value === "cosy_furniture")?.id, tags.find(t => t.value === "all_sofa")?.id].filter((id): id is string => Boolean(id)),
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
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1695289807/crusader/variants/T50440764/Hamilton-3-Seater-Sofa-Brilliant-White-Dim-SG-1695289804.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1716792107/crusader/variants/50440763-MC4001/Owen-Sofa-Headrest-Opal-Beige-Square-Det_10-1716792107.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1753686418/crusader/variants/T50440764/Hamilton-3-Seater-Sofa-Brilliant-White-Dim-SG-1753686416.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1634798684/crusader/variants/50440764-MC4001/Hamilton-3-Seater-Sofa-Smoke-Grey-Front-SG.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1634798684/crusader/variants/50440764-MC4001/Hamilton-3-Seater-Sofa-Smoke-Grey-Angle-SG.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1634798670/crusader/variants/50440764-MC4001/Hamilton-3-Seater-Sofa-Smoke-Grey-Side-SG.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1634798684/crusader/variants/50440764-MC4001/Hamilton-3-Seater-Sofa-Smoke-Grey-Back-SG.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1635413055/crusader/variants/50440764-MC4001/Hamilton-3-Seater-Sofa-Somke-Grey-Square-Set_3.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1634799118/crusader/variants/50440764-MC4001/Hamilton-3-Seater-Sofa-Smoke-Grey-Lifestyle-Crop.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1635413053/crusader/variants/50440764-MC4001/Hamilton-3-Seater-Sofa-Somke-Grey-Square-Set_4.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1672989511/crusader/variants/50440764-MC4001/Hamilton-Round-Chaise-Sectional-Sofa-in-Smoke-Grey-Square-Det_7-1672989508.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1753686418/crusader/variants/T50440764/Hamilton-3-Seater-Sofa-Smoke-Grey-Dim-SG-1753686416.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1730886058/crusader/variants/50440764C-IN4002/Hamilton-3-Seater-Sofa-White-Quartz-Front-1730886055.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1720679628/crusader/variants/54000102C-IN4002/White-Quartz_1-1720679625.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1730886138/crusader/variants/50440764C-PT4001/Hamilton-3-Seater-Sofa-Creamy-White-Front-1730886135.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1720679601/crusader/variants/54000102C-PT4001/Creamy-White-Twill_Adams_Owen-1720679599.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1730886089/crusader/variants/50440764C-IN4003/Hamilton-3-Seater-Sofa-Ginger-Front-1730886086.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1720679762/crusader/variants/54000102C-IN4003/Marlow_Ginger-1720679759.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1730886210/crusader/variants/50440764C-PY4001/Hamilton-3-Seater-Sofa-Ivory-Front-1730886207.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1722308046/crusader/variants/AS-000189C-PY4001-GD/Ivory-Swatch-Copy_1-1722308043.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1730886184/crusader/variants/50440764C-PY4002/Hamilton-3-Seater-Sofa-Dove-Grey-Front-1730886181.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1722308132/crusader/variants/AS-000189C-PY4002-GD/Dove-Grey-Swatch-Copy_1-1722308130.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1730886113/crusader/variants/50440764C-PY4004/Hamilton-3-Seater-Sofa-Cumin-Front-1730886111.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1722307826/crusader/variants/AS-000189C-PY4004-BLK/Cumin-Swathc-Copy_1-1722307823.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1730886158/crusader/variants/50440764C-PY4003/Hamilton-3-Seater-Sofa-Moss-Front-1730886155.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1722308164/crusader/variants/AS-000189C-PY4003-BLK/Moss-Swatch-Copy_1-1722308161.jpg"
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
        metadata: {
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1634798906/crusader/variants/50440764-MC4002/Hamilton-3-Seater-Sofa-Brilliant-White-Front-SG.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1634798906/crusader/variants/50440764-MC4002/Hamilton-3-Seater-Sofa-Brilliant-White-Angle-SG.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1634798906/crusader/variants/50440764-MC4002/Hamilton-3-Seater-Sofa-Brilliant-White-Side-SG.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1634798907/crusader/variants/50440764-MC4002/Hamilton-3-Seater-Sofa-Brilliant-White-Back-SG.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1635412853/crusader/variants/50440764-MC4002/Hamilton-3-Seater-Sofa-Brilliant-White-Square-Set_4.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1634799049/crusader/variants/50440764-MC4002/Hamilton-3-Seater-Sofa-Brilliant-White-Square-Set_1.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1635412852/crusader/variants/50440764-MC4002/Hamilton-3-Seater-Sofa-Brilliant-White-Square-Set_3.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1717398937/crusader/variants/50440764-MC4001/Owen-Sofa-Headrest-Opal-Beige-Square-Det_10-1717398935.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1672979178/crusader/variants/50440764-MC4002/Hamilton-Sectional-Sofa-Brilliant-White-Square-Det_6-1672979175.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1695289807/crusader/variants/T50440764/Hamilton-3-Seater-Sofa-Brilliant-White-Dim-SG-1695289804.png"
          ]
},
        prices: [
          {
            amount: 143900,
            currency_code: 'usd',
          },
          {
            amount: 143900,
            currency_code: 'usd',
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
        metadata: {
          "cover_type": "Removable frame, seat and back cushions",
          "product_weight": "55.8kg",
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1634798906/crusader/variants/50440764-MC4002/Hamilton-3-Seater-Sofa-Brilliant-White-Front-SG.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1634798906/crusader/variants/50440764-MC4002/Hamilton-3-Seater-Sofa-Brilliant-White-Angle-SG.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1634798906/crusader/variants/50440764-MC4002/Hamilton-3-Seater-Sofa-Brilliant-White-Side-SG.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1634798907/crusader/variants/50440764-MC4002/Hamilton-3-Seater-Sofa-Brilliant-White-Back-SG.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1635412853/crusader/variants/50440764-MC4002/Hamilton-3-Seater-Sofa-Brilliant-White-Square-Set_4.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1634799049/crusader/variants/50440764-MC4002/Hamilton-3-Seater-Sofa-Brilliant-White-Square-Set_1.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1635412852/crusader/variants/50440764-MC4002/Hamilton-3-Seater-Sofa-Brilliant-White-Square-Set_3.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1716792107/crusader/variants/50440763-MC4001/Owen-Sofa-Headrest-Opal-Beige-Square-Det_10-1716792107.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1672979178/crusader/variants/50440764-MC4002/Hamilton-Sectional-Sofa-Brilliant-White-Square-Det_6-1672979175.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1753686418/crusader/variants/T50440764/Hamilton-3-Seater-Sofa-Brilliant-White-Dim-SG-1753686416.png"
          ]
},
        prices: [
          {
            amount: 159900,
            currency_code: 'usd',
          },
          {
            amount: 159900,
            currency_code: 'usd',
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
        metadata: {
          "cover_type": "Removable frame, seat and back cushions",
          "product_weight": "55.8kg",
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1634798684/crusader/variants/50440764-MC4001/Hamilton-3-Seater-Sofa-Smoke-Grey-Front-SG.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1634798684/crusader/variants/50440764-MC4001/Hamilton-3-Seater-Sofa-Smoke-Grey-Angle-SG.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1634798670/crusader/variants/50440764-MC4001/Hamilton-3-Seater-Sofa-Smoke-Grey-Side-SG.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1634798684/crusader/variants/50440764-MC4001/Hamilton-3-Seater-Sofa-Smoke-Grey-Back-SG.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1635413055/crusader/variants/50440764-MC4001/Hamilton-3-Seater-Sofa-Somke-Grey-Square-Set_3.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1634799118/crusader/variants/50440764-MC4001/Hamilton-3-Seater-Sofa-Smoke-Grey-Lifestyle-Crop.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1635413053/crusader/variants/50440764-MC4001/Hamilton-3-Seater-Sofa-Somke-Grey-Square-Set_4.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1716792107/crusader/variants/50440763-MC4001/Owen-Sofa-Headrest-Opal-Beige-Square-Det_10-1716792107.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1672989511/crusader/variants/50440764-MC4001/Hamilton-Round-Chaise-Sectional-Sofa-in-Smoke-Grey-Square-Det_7-1672989508.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1753686418/crusader/variants/T50440764/Hamilton-3-Seater-Sofa-Smoke-Grey-Dim-SG-1753686416.png"
          ]
},
        prices: [
          {
            amount: 159900,
            currency_code: 'usd',
          },
          {
            amount: 159900,
            currency_code: 'usd',
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
        metadata: {
          "fabric_composition": "100% Polyester",
          "cover_type": "All covers are removable, (including cushions cover and sofa frame cover)",
          "product_weight": "55.8kg",
          "cancellation": "Customisation—no cancellation",
          "returns": "Customisation—no refund or exchange",
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1730886058/crusader/variants/50440764C-IN4002/Hamilton-3-Seater-Sofa-White-Quartz-Front-1730886055.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1720679628/crusader/variants/54000102C-IN4002/White-Quartz_1-1720679625.jpg"
          ]
},
        prices: [
          {
            amount: 183900,
            currency_code: 'usd',
          },
          {
            amount: 183900,
            currency_code: 'usd',
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
        metadata: {
          "fabric_composition": "80% Polyester, 20% Acrylic",
          "cover_type": "All covers are removable, (including cushions cover and sofa frame cover)",
          "product_weight": "55.8kg",
          "cancellation": "Customisation—no cancellation",
          "returns": "Customisation—no refund or exchange",
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1730886138/crusader/variants/50440764C-PT4001/Hamilton-3-Seater-Sofa-Creamy-White-Front-1730886135.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1720679601/crusader/variants/54000102C-PT4001/Creamy-White-Twill_Adams_Owen-1720679599.jpg"
          ]
},
        prices: [
          {
            amount: 178900,
            currency_code: 'usd',
          },
          {
            amount: 178900,
            currency_code: 'usd',
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
        metadata: {
          "fabric_composition": "100% Polyester",
          "cover_type": "All covers are removable, (including cushions cover and sofa frame cover)",
          "product_weight": "55.8kg",
          "cancellation": "Customisation—no cancellation",
          "returns": "Customisation—no refund or exchange",
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1730886089/crusader/variants/50440764C-IN4003/Hamilton-3-Seater-Sofa-Ginger-Front-1730886086.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1720679762/crusader/variants/54000102C-IN4003/Marlow_Ginger-1720679759.jpg"
          ]
},
        prices: [
          {
            amount: 183900,
            currency_code: 'usd',
          },
          {
            amount: 183900,
            currency_code: 'usd',
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
        metadata: {
          "fabric_composition": "100% Polyester",
          "cover_type": "All covers are removable, (including cushions cover and sofa frame cover)",
          "product_weight": "55.8kg",
          "cancellation": "Customisation—no cancellation",
          "returns": "Customisation—no refund or exchange",
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1730886210/crusader/variants/50440764C-PY4001/Hamilton-3-Seater-Sofa-Ivory-Front-1730886207.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1722308046/crusader/variants/AS-000189C-PY4001-GD/Ivory-Swatch-Copy_1-1722308043.jpg"
          ]
},
        prices: [
          {
            amount: 178900,
            currency_code: 'usd',
          },
          {
            amount: 178900,
            currency_code: 'usd',
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
        metadata: {
          "fabric_composition": "100% Polyester",
          "cover_type": "All covers are removable, (including cushions cover and sofa frame cover)",
          "product_weight": "55.8kg",
          "cancellation": "Customisation—no cancellation",
          "returns": "Customisation—no refund or exchange",
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1730886184/crusader/variants/50440764C-PY4002/Hamilton-3-Seater-Sofa-Dove-Grey-Front-1730886181.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1722308132/crusader/variants/AS-000189C-PY4002-GD/Dove-Grey-Swatch-Copy_1-1722308130.jpg"
          ]
},
        prices: [
          {
            amount: 178900,
            currency_code: 'usd',
          },
          {
            amount: 178900,
            currency_code: 'usd',
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
        metadata: {
          "fabric_composition": "100% Polyester",
          "cover_type": "All covers are removable, (including cushions cover and sofa frame cover)",
          "product_weight": "55.8kg",
          "cancellation": "Customisation—no cancellation",
          "returns": "Customisation—no refund or exchange",
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1730886113/crusader/variants/50440764C-PY4004/Hamilton-3-Seater-Sofa-Cumin-Front-1730886111.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1722307826/crusader/variants/AS-000189C-PY4004-BLK/Cumin-Swathc-Copy_1-1722307823.jpg"
          ]
},
        prices: [
          {
            amount: 178900,
            currency_code: 'usd',
          },
          {
            amount: 178900,
            currency_code: 'usd',
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
        metadata: {
          "fabric_composition": "100% Polyester",
          "cover_type": "All covers are removable, (including cushions cover and sofa frame cover)",
          "product_weight": "55.8kg",
          "cancellation": "Customisation—no cancellation",
          "returns": "Customisation—no refund or exchange",
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1730886158/crusader/variants/50440764C-PY4003/Hamilton-3-Seater-Sofa-Moss-Front-1730886155.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1722308164/crusader/variants/AS-000189C-PY4003-BLK/Moss-Swatch-Copy_1-1722308161.jpg"
          ]
},
        prices: [
          {
            amount: 178900,
            currency_code: 'usd',
          },
          {
            amount: 178900,
            currency_code: 'usd',
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
    metadata: {
    "material": "Frame: engineered wood and plywood; Leg: engineered wood with oak veneer",
    "care": "Fabric sofa",
    "filling": "Feather, foam, fibre and pocket spring filled seat; Feather and fibre filled back",
    "cover_type": "Removable seat, back and pillow covers",
    "dimensions": "W99 x D178 x H81.5cm",
    "weight": "49.5kg",
    "seating_depth": "130cm (without pillow)",
    "seating_height": "43cm",
    "comfort_ratings": {
        "overall_sit_rating": "1",
        "seat_depth_rating": "5",
        "seat_height_rating": "3",
        "seat_softness_rating": "1"
    },
    "warranty": "Frame 10 years; Fabric 1 year; Foam 2 years",
    "assembly": "Legs to be fitted"
},
    category_ids: [categories.find(c => c.name === "Modular Chaises")?.id, categories.find(c => c.name === "Sofa & Armchairs")?.id].filter((id): id is string => Boolean(id)),
    tag_ids: [tags.find(t => t.value === "s3'25 products")?.id, tags.find(t => t.value === "new")?.id, tags.find(t => t.value === "storewide_sale")?.id].filter((id): id is string => Boolean(id)),
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
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757054005/crusader/variants/AS-000860-PG4001-WA/Mori-Right-Facing-Chaise-Sofa-Alpine-Walnut-Front-1757054004.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757054005/crusader/variants/AS-000860-PG4001-WA/Mori-Right-Facing-Chaise-Sofa-Alpine-Walnut-Angle-1757054005.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757054005/crusader/variants/AS-000860-PG4001-WA/Mori-Right-Facing-Chaise-Sofa-Alpine-Walnut-Side-1757054005.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757054005/crusader/variants/AS-000860-PG4001-WA/Mori-Right-Facing-Chaise-Sofa-Alpine-Walnut-Back-1757054005.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1759046958/crusader/variants/AS-000860-PG4001-WA/Mori-Right-Facing-Chaise-Sectional-Sofa-With-Ottoman-Alpine-Walnut-Leg-Square-Set_1-1759046958.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1759046958/crusader/variants/AS-000860-PG4001-WA/Mori-Right-Facing-Chaise-Sectional-Sofa-Alpine-With-Side-Table-With-Ottoman-Walnut-Leg-Square-Set_1-1759046958.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1716800253/crusader/variants/AS-000412-PG4001/Sofa-Armrest-Table-Natural-Square-Set_4-1716800253.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757043580/crusader/variants/50441077-PH4001/Mori-L-Shape-Sofa-Alpine-Walnut-Square-Det_2-1757043579.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757043579/crusader/variants/50441077-PH4001/Mori-Left-Facing-Chaise-Sectional-Sofa-Alpine-Walnut-Square-Det_2-1757043579.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757052739/crusader/variants/50441077-PH4001/Mori-Side-Ottoman-Alpine-Walnut-Leg-Det_1-1757052739.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1755497544/crusader/variants/PB-001727-PG4001-WA/Arden-Swivel-Armchair-Alpine-Square-Det_1__1_-1755497542.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757064364/crusader/variants/AS-000859-PG4002-NA/Mori-Right-Facing-Chaise-Oat-Walnut-Leg-Front-1757064364.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757064366/crusader/variants/AS-000859-PG4002-NA/Mori-Right-Facing-Chaise-Oat-Walnut-Leg-Angle-1757064365.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757064367/crusader/variants/AS-000859-PG4002-NA/Mori-Right-Facing-Chaise-Oat-Walnut-Leg-Side-1757064364.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757064366/crusader/variants/AS-000859-PG4002-NA/Mori-Right-Facing-Chaise-Oat-Walnut-Leg-Back-1757064364.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1759046866/crusader/variants/AS-000859-PG4002-NA/Mori-Right-Facing-Chaise-Sectional-Sofa-Oat-Natural-Leg-With-Ottoman-Oat-Natural-Square-Set_1-1759046866.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1759046866/crusader/variants/AS-000859-PG4002-NA/Mori-Right-Facing-Chaise-Sectional-Sofa-Oat-With-Side-Table-Natural-Leg-Square-Set_1-1759046866.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757043371/crusader/variants/50441077-PH4001/Mori-3-Seater-Sofa-Oat-Natural-Leg-Det_1-1757043371.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757043372/crusader/variants/50441077-PH4001/Mori-Armchair-Oat-Natural-Leg-Det_1-1757043371.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757043371/crusader/variants/50441077-PH4001/Mori-Side-Ottoman-Oat-Natural-Leg-Det_1-1757043371.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757038253/crusader/variants/50441077-PH4001/Mori-Armchair-Oat-Walnut-Leg-Det_2-1757038253.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757056937/crusader/variants/AS-000860-PG4002-WA/Mori-Right-Facing-Chaise-Oat-Walnut-Leg-Front-1757056937.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757056937/crusader/variants/AS-000860-PG4002-WA/Mori-Right-Facing-Chaise-Oat-Walnut-Leg-Angle-1757056937.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757056937/crusader/variants/AS-000860-PG4002-WA/Mori-Right-Facing-Chaise-Oat-Walnut-Leg-Side-1757056937.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757056937/crusader/variants/AS-000860-PG4002-WA/Mori-Right-Facing-Chaise-Oat-Walnut-Leg-Back-1757056937.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1759046914/crusader/variants/AS-000860-PG4002-WA/Mori-Right-Facing-Chaise-Sectional-Sofa-With-Ottoman-Oat-Walnut-Leg-Square-Set_1-1759046914.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1759046914/crusader/variants/AS-000860-PG4002-WA/Mori-Right-Facing-Chaise-Sectional-Sofa-Oat-With-Side-Table-With-Ottoman-Walnut-Leg-Square-Set_1-1759046914.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757038253/crusader/variants/50441077-PH4001/Mori-Armchair-Oat-Walnut-Leg-Det_1-1757038253.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757038253/crusader/variants/50441077-PH4001/Mori-3-Seater-Sofa-Oat-Walnut-Leg-Det_1-1757038253.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757038253/crusader/variants/50441077-PH4001/Mori-Side-Ottoman-Oat-Walnut-Leg-Det_1-1757038253.jpg"
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
        metadata: {
          "frame": "Plywood and engineered wood",
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691395506/crusader/variants/AS-000403-PG4001/Mori-Right-Facing-Chaise-Sofa-Alpine-Front-1691395504.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691395506/crusader/variants/AS-000403-PG4001/Mori-Right-Facing-Chaise-Sofa-Alpine-Angle-1691395504.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691395506/crusader/variants/AS-000403-PG4001/Mori-Right-Facing-Chaise-Sofa-Alpine-Side-1691395504.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691395506/crusader/variants/AS-000403-PG4001/Mori-Right-Facing-Chaise-Sofa-Alpine-Back-1691395504.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692004617/crusader/variants/AS-000403-PG4001/Mori-Right-Facing-Chaise-Sectional-Sofa-Square-Set_5-1692004615.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692003381/crusader/variants/AS-000403-PG4001/Mori-Right-Facing-Chaise-Sectional-Sofa-With-Attachable-Ottoman-Square-Set_1-1692003378.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692003381/crusader/variants/AS-000403-PG4001/Mori-Right-Facing-Chaise-Sectional-Sofa-Square-Set_4-1692003378.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1716799505/crusader/variants/AS-000403-PG4001/Sofa-Armrest-Table-Natural-Square-Set_4-1716799505.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692004738/crusader/variants/AS-000403-PG4001/Mori-L-Shape-Sofa-Alpine-Square-Det_2-1692004735.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692004738/crusader/variants/AS-000403-PG4001/Mori-Left-Facing-Chaise-Sectional-Sofa-Alpine-Square-Det_2-1692004735.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692347974/crusader/variants/AS-000403-PG4001/Mori-Ottoman-Alpine-Det_1-1692347969.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691395522/crusader/variants/AS-000403-PG4001/Arden-Swivel-Armchair-Alpine-Square-Det_1-1691395520.jpg"
          ]
},
        prices: [
          {
            amount: 149900,
            currency_code: 'usd',
          },
          {
            amount: 149900,
            currency_code: 'usd',
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
        metadata: {
          "finish": "Leg: water based in walnut",
          "material": "Frame: engineered wood and plywood; Leg: engineered wood with walnut veneer",
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757054005/crusader/variants/AS-000860-PG4001-WA/Mori-Right-Facing-Chaise-Sofa-Alpine-Walnut-Front-1757054004.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757054005/crusader/variants/AS-000860-PG4001-WA/Mori-Right-Facing-Chaise-Sofa-Alpine-Walnut-Angle-1757054005.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757054005/crusader/variants/AS-000860-PG4001-WA/Mori-Right-Facing-Chaise-Sofa-Alpine-Walnut-Side-1757054005.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757054005/crusader/variants/AS-000860-PG4001-WA/Mori-Right-Facing-Chaise-Sofa-Alpine-Walnut-Back-1757054005.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1759046958/crusader/variants/AS-000860-PG4001-WA/Mori-Right-Facing-Chaise-Sectional-Sofa-With-Ottoman-Alpine-Walnut-Leg-Square-Set_1-1759046958.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1759046958/crusader/variants/AS-000860-PG4001-WA/Mori-Right-Facing-Chaise-Sectional-Sofa-Alpine-With-Side-Table-With-Ottoman-Walnut-Leg-Square-Set_1-1759046958.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1716800253/crusader/variants/AS-000412-PG4001/Sofa-Armrest-Table-Natural-Square-Set_4-1716800253.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757043580/crusader/variants/50441077-PH4001/Mori-L-Shape-Sofa-Alpine-Walnut-Square-Det_2-1757043579.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757043579/crusader/variants/50441077-PH4001/Mori-Left-Facing-Chaise-Sectional-Sofa-Alpine-Walnut-Square-Det_2-1757043579.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757052739/crusader/variants/50441077-PH4001/Mori-Side-Ottoman-Alpine-Walnut-Leg-Det_1-1757052739.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1755497544/crusader/variants/PB-001727-PG4001-WA/Arden-Swivel-Armchair-Alpine-Square-Det_1__1_-1755497542.jpg"
          ]
},
        prices: [
          {
            amount: 149900,
            currency_code: 'usd',
          },
          {
            amount: 149900,
            currency_code: 'usd',
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
        metadata: {
          "frame": "Plywood and engineered wood",
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757064364/crusader/variants/AS-000859-PG4002-NA/Mori-Right-Facing-Chaise-Oat-Walnut-Leg-Front-1757064364.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757064366/crusader/variants/AS-000859-PG4002-NA/Mori-Right-Facing-Chaise-Oat-Walnut-Leg-Angle-1757064365.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757064367/crusader/variants/AS-000859-PG4002-NA/Mori-Right-Facing-Chaise-Oat-Walnut-Leg-Side-1757064364.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757064366/crusader/variants/AS-000859-PG4002-NA/Mori-Right-Facing-Chaise-Oat-Walnut-Leg-Back-1757064364.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1759046866/crusader/variants/AS-000859-PG4002-NA/Mori-Right-Facing-Chaise-Sectional-Sofa-Oat-Natural-Leg-With-Ottoman-Oat-Natural-Square-Set_1-1759046866.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1759046866/crusader/variants/AS-000859-PG4002-NA/Mori-Right-Facing-Chaise-Sectional-Sofa-Oat-With-Side-Table-Natural-Leg-Square-Set_1-1759046866.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1716800253/crusader/variants/AS-000412-PG4001/Sofa-Armrest-Table-Natural-Square-Set_4-1716800253.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757043371/crusader/variants/50441077-PH4001/Mori-3-Seater-Sofa-Oat-Natural-Leg-Det_1-1757043371.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757043372/crusader/variants/50441077-PH4001/Mori-Armchair-Oat-Natural-Leg-Det_1-1757043371.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757043371/crusader/variants/50441077-PH4001/Mori-Side-Ottoman-Oat-Natural-Leg-Det_1-1757043371.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757038253/crusader/variants/50441077-PH4001/Mori-Armchair-Oat-Walnut-Leg-Det_2-1757038253.jpg"
          ]
},
        prices: [
          {
            amount: 149900,
            currency_code: 'usd',
          },
          {
            amount: 149900,
            currency_code: 'usd',
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
        metadata: {
          "finish": "Leg: water based in walnut",
          "material": "Frame: engineered wood and plywood; Leg: engineered wood with walnut veneer",
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757056937/crusader/variants/AS-000860-PG4002-WA/Mori-Right-Facing-Chaise-Oat-Walnut-Leg-Front-1757056937.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757056937/crusader/variants/AS-000860-PG4002-WA/Mori-Right-Facing-Chaise-Oat-Walnut-Leg-Angle-1757056937.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757056937/crusader/variants/AS-000860-PG4002-WA/Mori-Right-Facing-Chaise-Oat-Walnut-Leg-Side-1757056937.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757056937/crusader/variants/AS-000860-PG4002-WA/Mori-Right-Facing-Chaise-Oat-Walnut-Leg-Back-1757056937.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1759046914/crusader/variants/AS-000860-PG4002-WA/Mori-Right-Facing-Chaise-Sectional-Sofa-With-Ottoman-Oat-Walnut-Leg-Square-Set_1-1759046914.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1759046914/crusader/variants/AS-000860-PG4002-WA/Mori-Right-Facing-Chaise-Sectional-Sofa-Oat-With-Side-Table-With-Ottoman-Walnut-Leg-Square-Set_1-1759046914.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1716800253/crusader/variants/AS-000412-PG4001/Sofa-Armrest-Table-Natural-Square-Set_4-1716800253.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757038253/crusader/variants/50441077-PH4001/Mori-Armchair-Oat-Walnut-Leg-Det_1-1757038253.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757038253/crusader/variants/50441077-PH4001/Mori-3-Seater-Sofa-Oat-Walnut-Leg-Det_1-1757038253.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757038253/crusader/variants/50441077-PH4001/Mori-Side-Ottoman-Oat-Walnut-Leg-Det_1-1757038253.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757038253/crusader/variants/50441077-PH4001/Mori-Armchair-Oat-Walnut-Leg-Det_2-1757038253.jpg"
          ]
},
        prices: [
          {
            amount: 149900,
            currency_code: 'usd',
          },
          {
            amount: 149900,
            currency_code: 'usd',
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
    metadata: {
    "material": "Frame: engineered wood and plywood; Leg: engineered wood with oak veneer",
    "care": "Fabric sofa",
    "filling": "Feather, foam, fibre and pocket spring filled seat",
    "cover_type": "Removable seat, back and pillow covers",
    "dimensions": "W85.5 x D116 x H41cm",
    "weight": "14.9kg",
    "seating_depth": "116cm",
    "seating_height": "43cm",
    "comfort_ratings": {
        "overall_sit_rating": "1",
        "seat_depth_rating": "5",
        "seat_height_rating": "3",
        "seat_softness_rating": "1"
    },
    "warranty": "Frame 10 years; Fabric 1 year; Foam 2 years",
    "assembly": "Legs to be fitted"
},
    category_ids: [categories.find(c => c.name === "Ottomans")?.id, categories.find(c => c.name === "Sofa & Armchairs")?.id].filter((id): id is string => Boolean(id)),
    tag_ids: [tags.find(t => t.value === "storewide_sale")?.id, tags.find(t => t.value === "all furniture excluding accessories\t")?.id, tags.find(t => t.value === "storewide exclude beige covers")?.id, tags.find(t => t.value === "gss event storewide sale excluding gwp")?.id, tags.find(t => t.value === "all product excluding customisation")?.id, tags.find(t => t.value === "match & save")?.id, tags.find(t => t.value === "all_ottoman")?.id, tags.find(t => t.value === "all products")?.id, tags.find(t => t.value === "modular_sofas")?.id, tags.find(t => t.value === "s3_event_tag")?.id, tags.find(t => t.value === "style_modernfarmhouse")?.id, tags.find(t => t.value === "sofa_bundle_complementary_products")?.id].filter((id): id is string => Boolean(id)),
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
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757054123/crusader/variants/AS-000864-PG4001-WA/Mori-Side-Ottoman-Alpine-Walnut-Side-1757054123.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757054123/crusader/variants/AS-000864-PG4001-WA/Mori-Side-Ottoman-Alpine-Walnut-Front-1757054123.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757054123/crusader/variants/AS-000864-PG4001-WA/Mori-Side-Ottoman-Alpine-Walnut-Angle-1757054123.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1761790244/crusader/variants/AS-000864-PG4001-WA/Mori-Right-Facing-2-Seater-Sofa-With-Side-Table-With-Attachable-Ottoman-Alpine-Walnut-Set_1__1_-1761790243.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757043579/crusader/variants/50441077-PH4001/Mori-Armless-L-Shape-Sectional-Sofa-Alpine-Walnut-Square-Det_2-1757043579.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757052739/crusader/variants/50441077-PH4001/Mori-Side-Ottoman-Alpine-Walnut-Leg-Det_1-1757052739.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1755497544/crusader/variants/PB-001727-PG4001-WA/Arden-Swivel-Armchair-Alpine-Square-Det_1__1_-1755497542.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757063659/crusader/variants/AS-000863-PG4002-NA/Mori-Side-Ottoman-Oat-Natural-Leg-Front-1757063658.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757063659/crusader/variants/AS-000863-PG4002-NA/Mori-Side-Ottoman-Oat-Natural-Leg-Angle-1757063658.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757063659/crusader/variants/AS-000863-PG4002-NA/Mori-Side-Ottoman-Oat-Natural-Leg-Side-1757063658.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1761790651/crusader/variants/AS-000863-PG4002-NA/Mori-Right-Facing-2-Seater-Sofa-With-Side-Table-And-Attachable-Ottoman-Alpine-Natural-Set_1-1761790651.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757064549/crusader/variants/AS-000863-PG4002-NA/Mori-Armless-L-Shaped-Sectional-Sofa-Oat-Natural-Leg-Det_1-1757064549.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757043371/crusader/variants/50441077-PH4001/Mori-Side-Ottoman-Oat-Natural-Leg-Det_1-1757043371.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757038253/crusader/variants/50441077-PH4001/Mori-Armchair-Oat-Walnut-Leg-Det_2-1757038253.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757057009/crusader/variants/AS-000864-PG4002-WA/Mori-Side-Ottoman-Oat-Walnut-Leg-Front-1757057009.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757057009/crusader/variants/AS-000864-PG4002-WA/Mori-Side-Ottoman-Oat-Walnut-Leg-Angle-1757057009.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757057009/crusader/variants/AS-000864-PG4002-WA/Mori-Side-Ottoman-Oat-Walnut-Leg-Side-1757057009.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757038253/crusader/variants/50441077-PH4001/Mori-Armless-L-Shaped-Sectional-Sofa-Oat-Det_1-1757038253.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757038253/crusader/variants/50441077-PH4001/Mori-Side-Ottoman-Oat-Walnut-Leg-Det_1-1757038253.jpg"
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
        metadata: {
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691396300/crusader/variants/AS-000404-PG4001/Mori-Large-Ottoman-Alpine-Side-1691396298.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692257444/crusader/variants/AS-000404-PG4001/Mori-Attachable-Ottoman-Alpine-Set_1-1692257441.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692246083/crusader/variants/AS-000404-PG4001/Mori-Left-Facing-2-Seater-Sofa-With-Side-Table-And-Attachable-Ottoman-Square-Set_1-1692246080.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692246083/crusader/variants/AS-000404-PG4001/Mori-Left-Facing-Chaise-Sectional-Sofa-With-Attachable-Ottoman-Square-Set_4-1692246080.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692002858/crusader/variants/AS-000404-PG4001/Mori-Armless-L-Shape-Sectional-Sofa-Alpine-Square-Det_2-1692002855.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692347987/crusader/variants/AS-000404-PG4001/Mori-Ottoman-Alpine-Det_1-1692347984.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691395662/crusader/variants/AS-000404-PG4001/Arden-Swivel-Armchair-Alpine-Square-Det_1-1691395660.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691396300/crusader/variants/AS-000404-PG4001/Mori-Large-Ottoman-Alpine-Angle-1691396298.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691396299/crusader/variants/AS-000404-PG4001/Mori-Large-Ottoman-Alpine-Front-1691396297.png"
          ]
},
        prices: [
          {
            amount: 66900,
            currency_code: 'usd',
          },
          {
            amount: 66900,
            currency_code: 'usd',
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
        metadata: {
          "frame": "Plywood and engineered wood",
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691396300/crusader/variants/AS-000404-PG4001/Mori-Large-Ottoman-Alpine-Side-1691396298.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691396300/crusader/variants/AS-000404-PG4001/Mori-Large-Ottoman-Alpine-Angle-1691396298.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691396299/crusader/variants/AS-000404-PG4001/Mori-Large-Ottoman-Alpine-Front-1691396297.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692257444/crusader/variants/AS-000404-PG4001/Mori-Attachable-Ottoman-Alpine-Set_1-1692257441.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692246083/crusader/variants/AS-000404-PG4001/Mori-Left-Facing-2-Seater-Sofa-With-Side-Table-And-Attachable-Ottoman-Square-Set_1-1692246080.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692246083/crusader/variants/AS-000404-PG4001/Mori-Left-Facing-Chaise-Sectional-Sofa-With-Attachable-Ottoman-Square-Set_4-1692246080.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692002858/crusader/variants/AS-000404-PG4001/Mori-Armless-L-Shape-Sectional-Sofa-Alpine-Square-Det_2-1692002855.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1692347987/crusader/variants/AS-000404-PG4001/Mori-Ottoman-Alpine-Det_1-1692347984.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1691395662/crusader/variants/AS-000404-PG4001/Arden-Swivel-Armchair-Alpine-Square-Det_1-1691395660.jpg"
          ]
},
        prices: [
          {
            amount: 66900,
            currency_code: 'usd',
          },
          {
            amount: 66900,
            currency_code: 'usd',
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
        metadata: {
          "finish": "Leg: water based in walnut",
          "material": "Frame: engineered wood and plywood; Leg: engineered wood with walnut veneer",
          "seating_height": "41cm",
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757054123/crusader/variants/AS-000864-PG4001-WA/Mori-Side-Ottoman-Alpine-Walnut-Side-1757054123.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757054123/crusader/variants/AS-000864-PG4001-WA/Mori-Side-Ottoman-Alpine-Walnut-Front-1757054123.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757054123/crusader/variants/AS-000864-PG4001-WA/Mori-Side-Ottoman-Alpine-Walnut-Angle-1757054123.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1761790244/crusader/variants/AS-000864-PG4001-WA/Mori-Right-Facing-2-Seater-Sofa-With-Side-Table-With-Attachable-Ottoman-Alpine-Walnut-Set_1__1_-1761790243.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757043579/crusader/variants/50441077-PH4001/Mori-Armless-L-Shape-Sectional-Sofa-Alpine-Walnut-Square-Det_2-1757043579.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757052739/crusader/variants/50441077-PH4001/Mori-Side-Ottoman-Alpine-Walnut-Leg-Det_1-1757052739.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1755497544/crusader/variants/PB-001727-PG4001-WA/Arden-Swivel-Armchair-Alpine-Square-Det_1__1_-1755497542.jpg"
          ]
},
        prices: [
          {
            amount: 66900,
            currency_code: 'usd',
          },
          {
            amount: 66900,
            currency_code: 'usd',
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
        metadata: {
          "seating_height": "41cm",
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757063659/crusader/variants/AS-000863-PG4002-NA/Mori-Side-Ottoman-Oat-Natural-Leg-Front-1757063658.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757063659/crusader/variants/AS-000863-PG4002-NA/Mori-Side-Ottoman-Oat-Natural-Leg-Angle-1757063658.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757063659/crusader/variants/AS-000863-PG4002-NA/Mori-Side-Ottoman-Oat-Natural-Leg-Side-1757063658.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1761790651/crusader/variants/AS-000863-PG4002-NA/Mori-Right-Facing-2-Seater-Sofa-With-Side-Table-And-Attachable-Ottoman-Alpine-Natural-Set_1-1761790651.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757064549/crusader/variants/AS-000863-PG4002-NA/Mori-Armless-L-Shaped-Sectional-Sofa-Oat-Natural-Leg-Det_1-1757064549.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757043371/crusader/variants/50441077-PH4001/Mori-Side-Ottoman-Oat-Natural-Leg-Det_1-1757043371.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757038253/crusader/variants/50441077-PH4001/Mori-Armchair-Oat-Walnut-Leg-Det_2-1757038253.jpg"
          ]
},
        prices: [
          {
            amount: 66900,
            currency_code: 'usd',
          },
          {
            amount: 66900,
            currency_code: 'usd',
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
        metadata: {
          "finish": "Leg: water based in walnut",
          "material": "Frame: engineered wood and plywood; Leg: engineered wood with walnut veneer",
          "seating_height": "41cm",
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757057009/crusader/variants/AS-000864-PG4002-WA/Mori-Side-Ottoman-Oat-Walnut-Leg-Front-1757057009.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757057009/crusader/variants/AS-000864-PG4002-WA/Mori-Side-Ottoman-Oat-Walnut-Leg-Angle-1757057009.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757057009/crusader/variants/AS-000864-PG4002-WA/Mori-Side-Ottoman-Oat-Walnut-Leg-Side-1757057009.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757038253/crusader/variants/50441077-PH4001/Mori-Armless-L-Shaped-Sectional-Sofa-Oat-Det_1-1757038253.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757038253/crusader/variants/50441077-PH4001/Mori-Side-Ottoman-Oat-Walnut-Leg-Det_1-1757038253.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1757038253/crusader/variants/50441077-PH4001/Mori-Armchair-Oat-Walnut-Leg-Det_2-1757038253.jpg"
          ]
},
        prices: [
          {
            amount: 66900,
            currency_code: 'usd',
          },
          {
            amount: 66900,
            currency_code: 'usd',
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
    metadata: {
    "care": "Upholstered seating",
    "dimensions": "W49 x D59 x H82cm",
    "weight": "8kg",
    "seating_depth": "43cm",
    "seating_height": "47cm",
    "warranty": "10-year limited warranty",
    "assembly": "Legs and seat to be fitted"
},
    category_ids: [categories.find(c => c.name === "Chairs & Benches")?.id, categories.find(c => c.name === "Dining Chairs")?.id].filter((id): id is string => Boolean(id)),
    tag_ids: [tags.find(t => t.value === "storewide_sale")?.id, tags.find(t => t.value === "all furniture excluding accessories\t")?.id, tags.find(t => t.value === "storewide exclude beige covers")?.id, tags.find(t => t.value === "gss event storewide sale excluding gwp")?.id, tags.find(t => t.value === "all product excluding customisation")?.id, tags.find(t => t.value === "match & save")?.id, tags.find(t => t.value === "all_indoor_dining_chair")?.id, tags.find(t => t.value === "all products")?.id].filter((id): id is string => Boolean(id)),
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
        metadata: {
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1703744131/crusader/variants/41960031/Vincent-Dining-Chair-Oak-Angle-1703744129.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1703744131/crusader/variants/41960031/Vincent-Dining-Chair-Oak-Front-1703744129.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1703744131/crusader/variants/41960031/Vincent-Dining-Chair-Oak-Side-1703744129.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1703744131/crusader/variants/41960031/Vincent-Dining-Chair-Oak-Back-1703744129.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1705906803/crusader/variants/41960031/Vincent-Dining-Chair-Oak-Square-Set_1-1705906801.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1705906804/crusader/variants/41960031/Vincent-Dining-Table-With-6-Dining-Chair-Walnut-Square-Set_1-1705906801.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1705906803/crusader/variants/41960031/Vincent-Dining-Table-With-6-Dining-Chair-Walnut-Square-Set_2-1705906801.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1703744150/crusader/variants/41960031/Vincent-Dining-Chair-Oak-Square-Det_4-1703744147.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1703744150/crusader/variants/41960031/Vincent-Dining-Chair-Oak-Square-Det_3-1703744147.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1703744150/crusader/variants/41960031/Vincent-Dining-Chair-Oak-Square-Det_5-1703744147.jpg"
          ]
},
        prices: [
          {
            amount: 27900,
            currency_code: 'usd',
          },
          {
            amount: 27900,
            currency_code: 'usd',
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
    metadata: {
    "material": "Pottery stoneware",
    "care": "Dishwasher and microwave safe",
    "dimensions": "Dia. 14.92 x H6.35cm",
    "warranty": "1-year limited warranty",
    "assembly": "Fully assembled"
},
    category_ids: [categories.find(c => c.name === "Cereal Bowls")?.id, categories.find(c => c.name === "Tableware")?.id].filter((id): id is string => Boolean(id)),
    tag_ids: [tags.find(t => t.value === "storewide_sale")?.id, tags.find(t => t.value === "c&c_accessories")?.id, tags.find(t => t.value === "storewide exclude beige covers")?.id, tags.find(t => t.value === "all_accessories")?.id, tags.find(t => t.value === "all products")?.id, tags.find(t => t.value === "gss event storewide sale excluding gwp")?.id, tags.find(t => t.value === "all product excluding customisation")?.id, tags.find(t => t.value === "homeware launch")?.id, tags.find(t => t.value === "match & save")?.id].filter((id): id is string => Boolean(id)),
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
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710840491/crusader/variants/50430004-SWE/Grace-Snow-White-Cereal-Bowls-Set-of-4_Front-1710840488.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1715064485/crusader/variants/50430004-SWE/Grace-4-Piece-Snow-White-Dinnerware-Set-Square-Set_1-1715064485.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710840491/crusader/variants/50430004-SWE/Grace-Cereal-Bowl-Snow-White-Square-Det_1-1710840488.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1715064485/crusader/variants/50430004-SWE/Grace-Collection-Square-Set_1-1715064485.jpg"
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
        metadata: {
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710840472/crusader/variants/50430004-LGY/Grace-Light-Grey-Cereal-Bowls-Set-of-4_Front-1710840469.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1715064517/crusader/variants/50430004-LGY/Grace-4-Light-Grey-White-Dinnerware-Set-Square-Set_1-1715064517.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710840472/crusader/variants/50430004-LGY/Grace-Cereal-Bowl-Light-Grey-Square-Det_1-1710840469.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1715064517/crusader/variants/50430004-LGY/Grace-Collection-Square-Set_1-1715064517.jpg"
          ]
},
        prices: [
          {
            amount: 5900,
            currency_code: 'usd',
          },
          {
            amount: 5900,
            currency_code: 'usd',
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
        metadata: {
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710840491/crusader/variants/50430004-SWE/Grace-Snow-White-Cereal-Bowls-Set-of-4_Front-1710840488.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1715064485/crusader/variants/50430004-SWE/Grace-4-Piece-Snow-White-Dinnerware-Set-Square-Set_1-1715064485.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710840491/crusader/variants/50430004-SWE/Grace-Cereal-Bowl-Snow-White-Square-Det_1-1710840488.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1715064485/crusader/variants/50430004-SWE/Grace-Collection-Square-Set_1-1715064485.jpg"
          ]
},
        prices: [
          {
            amount: 5900,
            currency_code: 'usd',
          },
          {
            amount: 5900,
            currency_code: 'usd',
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
    metadata: {
    "material": "Stoneware",
    "care": "Dishwasher and microwave safe",
    "dimensions": "Dia. 20.64 x H2.54cm",
    "warranty": "1-year limited warranty",
    "assembly": "Fully assembled"
},
    category_ids: [categories.find(c => c.name === "Salad Plates")?.id, categories.find(c => c.name === "Tableware")?.id].filter((id): id is string => Boolean(id)),
    tag_ids: [tags.find(t => t.value === "storewide_sale")?.id, tags.find(t => t.value === "c&c_accessories")?.id, tags.find(t => t.value === "storewide exclude beige covers")?.id, tags.find(t => t.value === "all_accessories")?.id, tags.find(t => t.value === "all products")?.id, tags.find(t => t.value === "gss event storewide sale excluding gwp")?.id, tags.find(t => t.value === "all product excluding customisation")?.id, tags.find(t => t.value === "homeware launch")?.id, tags.find(t => t.value === "match & save")?.id].filter((id): id is string => Boolean(id)),
    
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
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710838486/crusader/variants/50430009-BRD/Audrey-Brick-Red-Salad-Plates-Set-of-4_Front-1710838484.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1715065472/crusader/variants/50430009-BRD/Audrey-4-Piece-Brick-Red-Dinnerware-Set-Square-Set_1-1715065471.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710838531/crusader/variants/50430009-BRD/Audrey-Brick-Red-Dinner-Plate-Square-Det_1-1710838529.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1715065472/crusader/variants/50430009-BRD/Audrey-20-Piece-Brick-Red-Dinnerware-Set-Square-Set_1-1715065472.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710838549/crusader/variants/50430009-BCY/Audrey-Brown-Clay-Salad-Plates-Set-of-4_Front-1710838547.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1715065548/crusader/variants/50430009-BCY/Audrey-4-Piece-Brown-Clay-Dinnerware-Set-Square-Set_1-1715065548.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710838630/crusader/variants/50430009-BCY/Audrey-Brown-Clay-Dinner-Plate-Square-Det_1-1710838628.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1715065548/crusader/variants/50430009-BCY/Audrey-20-Piece-Sand-Dinnerware-Set-Square-Set_1-1715065548.jpg"
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
        metadata: {
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710838405/crusader/variants/50430009-SND/Audrey-Sand-Salad-Plates-Set-of-4_Front-1710838402.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1715065341/crusader/variants/50430009-SND/Audrey-4-Piece-Sand-Dinnerware-Set-Square-Set_1-1715065341.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710838425/crusader/variants/50430009-SND/Audrey-Sand-Dinner-Plate-Square-Det_1-1710838423.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1715065341/crusader/variants/50430009-SND/Audrey-20-Piece-Sand-Dinnerware-Set-Square-Set_1-1715065340.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710838643/crusader/variants/50430009-BCY/Audrey-Collection-Square-Set_1-1710838640.jpg"
          ]
},
        prices: [
          {
            amount: 5500,
            currency_code: 'usd',
          },
          {
            amount: 5500,
            currency_code: 'usd',
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
        metadata: {
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710838486/crusader/variants/50430009-BRD/Audrey-Brick-Red-Salad-Plates-Set-of-4_Front-1710838484.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1715065472/crusader/variants/50430009-BRD/Audrey-4-Piece-Brick-Red-Dinnerware-Set-Square-Set_1-1715065471.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710838531/crusader/variants/50430009-BRD/Audrey-Brick-Red-Dinner-Plate-Square-Det_1-1710838529.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1715065472/crusader/variants/50430009-BRD/Audrey-20-Piece-Brick-Red-Dinnerware-Set-Square-Set_1-1715065472.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710838643/crusader/variants/50430009-BCY/Audrey-Collection-Square-Set_1-1710838640.jpg"
          ]
},
        prices: [
          {
            amount: 5500,
            currency_code: 'usd',
          },
          {
            amount: 5500,
            currency_code: 'usd',
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
        metadata: {
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710838549/crusader/variants/50430009-BCY/Audrey-Brown-Clay-Salad-Plates-Set-of-4_Front-1710838547.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1715065548/crusader/variants/50430009-BCY/Audrey-4-Piece-Brown-Clay-Dinnerware-Set-Square-Set_1-1715065548.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710838630/crusader/variants/50430009-BCY/Audrey-Brown-Clay-Dinner-Plate-Square-Det_1-1710838628.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1715065548/crusader/variants/50430009-BCY/Audrey-20-Piece-Sand-Dinnerware-Set-Square-Set_1-1715065548.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710838643/crusader/variants/50430009-BCY/Audrey-Collection-Square-Set_1-1710838640.jpg"
          ]
},
        prices: [
          {
            amount: 5500,
            currency_code: 'usd',
          },
          {
            amount: 5500,
            currency_code: 'usd',
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
    metadata: {
    "material": "Stoneware",
    "care": "Dishwasher and microwave safe",
    "dimensions": "Dia. 17.78 x H5.4cm",
    "warranty": "1-year limited warranty",
    "assembly": "Fully assembled"
},
    category_ids: [categories.find(c => c.name === "Serving Bowls")?.id, categories.find(c => c.name === "Tableware")?.id].filter((id): id is string => Boolean(id)),
    tag_ids: [tags.find(t => t.value === "storewide_sale")?.id, tags.find(t => t.value === "c&c_accessories")?.id, tags.find(t => t.value === "storewide exclude beige covers")?.id, tags.find(t => t.value === "all_accessories")?.id, tags.find(t => t.value === "all products")?.id, tags.find(t => t.value === "gss event storewide sale excluding gwp")?.id, tags.find(t => t.value === "all product excluding customisation")?.id, tags.find(t => t.value === "homeware launch")?.id, tags.find(t => t.value === "match & save")?.id].filter((id): id is string => Boolean(id)),
    
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
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710838812/crusader/variants/50430010-BCY/Audrey-Brown-Clay-Serving-Bowls-Set-of-4_Front-1710838810.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1715065671/crusader/variants/50430010-BCY/Audrey-4-Piece-Brown-Clay-Dinnerware-Set-Square-Set_1-1715065671.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710838832/crusader/variants/50430010-BCY/Audrey-Brown-Clay-Serving-Bowl-Square-Det_1-1710838830.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1715065671/crusader/variants/50430010-BCY/Audrey-20-Piece-Brown-Clay-Dinnerware-Set-Square-Set_1-1715065671.jpg"
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
        metadata: {
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710838739/crusader/variants/50430010-BRD/Audrey-Brick-Red-Serving-Bowls-Set-of-4_Front-1710838736.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1715065625/crusader/variants/50430010-BRD/Audrey-4-Piece-Brick-Red-Dinnerware-Set-Square-Set_1-1715065625.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710838755/crusader/variants/50430010-BRD/Audrey-Brick-Red-Serving-Bowl-Square-Det_1-1710838753.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1715065625/crusader/variants/50430010-BRD/Audrey-20-Piece-Brick-Red-Dinnerware-Set-Square-Set_1-1715065625.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710838844/crusader/variants/50430010-BCY/Audrey-Collection-Square-Set_1-1710838842.jpg"
          ]
},
        prices: [
          {
            amount: 6500,
            currency_code: 'usd',
          },
          {
            amount: 6500,
            currency_code: 'usd',
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
        metadata: {
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710838812/crusader/variants/50430010-BCY/Audrey-Brown-Clay-Serving-Bowls-Set-of-4_Front-1710838810.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1715065671/crusader/variants/50430010-BCY/Audrey-4-Piece-Brown-Clay-Dinnerware-Set-Square-Set_1-1715065671.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710838832/crusader/variants/50430010-BCY/Audrey-Brown-Clay-Serving-Bowl-Square-Det_1-1710838830.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1715065671/crusader/variants/50430010-BCY/Audrey-20-Piece-Brown-Clay-Dinnerware-Set-Square-Set_1-1715065671.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710838844/crusader/variants/50430010-BCY/Audrey-Collection-Square-Set_1-1710838842.jpg"
          ]
},
        prices: [
          {
            amount: 6500,
            currency_code: 'usd',
          },
          {
            amount: 6500,
            currency_code: 'usd',
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
    metadata: {
    "material": "Stoneware",
    "care": "Dishwasher and microwave safe",
    "dimensions": "Dia. 13.34 x H6.99cm",
    "warranty": "1-year limited warranty",
    "assembly": "Fully assembled"
},
    category_ids: [categories.find(c => c.name === "Cereal Bowls")?.id, categories.find(c => c.name === "Tableware")?.id].filter((id): id is string => Boolean(id)),
    tag_ids: [tags.find(t => t.value === "storewide_sale")?.id, tags.find(t => t.value === "c&c_accessories")?.id, tags.find(t => t.value === "storewide exclude beige covers")?.id, tags.find(t => t.value === "all_accessories")?.id, tags.find(t => t.value === "all products")?.id, tags.find(t => t.value === "gss event storewide sale excluding gwp")?.id, tags.find(t => t.value === "all product excluding customisation")?.id, tags.find(t => t.value === "homeware launch")?.id, tags.find(t => t.value === "match & save")?.id].filter((id): id is string => Boolean(id)),
    
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
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710838933/crusader/variants/50430011-BRD/Audrey-Brick-Red-Cereal-Bowls-Set-of-4_Front-1710838931.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1715065710/crusader/variants/50430011-BRD/Audrey-4-Piece-Brick-Red-Dinnerware-Set-Square-Set_1-1715065710.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710838933/crusader/variants/50430011-BRD/Audrey-Brick-Red-Serving-Bowl-Square-Det_1-1710838931.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1715065711/crusader/variants/50430011-BRD/Audrey-20-Piece-Brick-Red-Dinnerware-Set-Square-Set_1-1715065710.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710838961/crusader/variants/50430011-BCY/Audrey-Brown-Clay-Cereal-Bowls-Set-of-4_Front-1710838959.png"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1715065734/crusader/variants/50430011-BCY/Audrey-4-Piece-Brown-Clay-Dinnerware-Set-Square-Set_1-1715065734.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710838961/crusader/variants/50430011-BCY/Audrey-Brown-Clay-Serving-Bowl-Square-Det_1-1710838959.jpg"
      },
      {
            "url": "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1715065734/crusader/variants/50430011-BCY/Audrey-20-Piece-Brown-Clay-Dinnerware-Set-Square-Set_1-1715065733.jpg"
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
        metadata: {
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710838900/crusader/variants/50430011-SND/Audrey-Sand-Cereal-Bowls-Set-of-4_Front-1710838898.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1715065593/crusader/variants/50430011-SND/Audrey-4-Piece-Sand-Dinnerware-Set-Square-Set_1-1715065593.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710838900/crusader/variants/50430011-SND/Audrey-Sand-Serving-Bowl-Square-Det_1-1710838898.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1715065592/crusader/variants/50430011-SND/Audrey-20-Piece-Sand-Dinnerware-Set-Square-Set_1-1715065592.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710838868/crusader/variants/50430011-BCY/Audrey-Collection-Square-Set_1-1710838865.jpg"
          ]
},
        prices: [
          {
            amount: 5500,
            currency_code: 'usd',
          },
          {
            amount: 5500,
            currency_code: 'usd',
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
        metadata: {
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710838933/crusader/variants/50430011-BRD/Audrey-Brick-Red-Cereal-Bowls-Set-of-4_Front-1710838931.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1715065710/crusader/variants/50430011-BRD/Audrey-4-Piece-Brick-Red-Dinnerware-Set-Square-Set_1-1715065710.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710838933/crusader/variants/50430011-BRD/Audrey-Brick-Red-Serving-Bowl-Square-Det_1-1710838931.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1715065711/crusader/variants/50430011-BRD/Audrey-20-Piece-Brick-Red-Dinnerware-Set-Square-Set_1-1715065710.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710838868/crusader/variants/50430011-BCY/Audrey-Collection-Square-Set_1-1710838865.jpg"
          ]
},
        prices: [
          {
            amount: 5500,
            currency_code: 'usd',
          },
          {
            amount: 5500,
            currency_code: 'usd',
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
        metadata: {
          "images": [
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710838961/crusader/variants/50430011-BCY/Audrey-Brown-Clay-Cereal-Bowls-Set-of-4_Front-1710838959.png",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1715065734/crusader/variants/50430011-BCY/Audrey-4-Piece-Brown-Clay-Dinnerware-Set-Square-Set_1-1715065734.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710838961/crusader/variants/50430011-BCY/Audrey-Brown-Clay-Serving-Bowl-Square-Det_1-1710838959.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1715065734/crusader/variants/50430011-BCY/Audrey-20-Piece-Brown-Clay-Dinnerware-Set-Square-Set_1-1715065733.jpg",
                    "https://res.cloudinary.com/castlery/image/private/c_fit,f_auto,q_auto,w_1000/v1710838868/crusader/variants/50430011-BCY/Audrey-Collection-Square-Set_1-1710838865.jpg"
          ]
},
        prices: [
          {
            amount: 5500,
            currency_code: 'usd',
          },
          {
            amount: 5500,
            currency_code: 'usd',
          },
        ],
      }
    ],
  }
];
