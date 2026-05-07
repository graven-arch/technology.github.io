// ============================================================
//  TECHPRO.TG — Base de données produits & configuration
//  Modifier ce fichier pour mettre à jour le catalogue
// ============================================================

const SITE_CONFIG = {
  company:    'TechPro.tg',
  tagline:    'L\'équipement tech haute performance',
  email:      'contact@techpro.tg',
  phone:      '+228 90 00 00 00',
  address:    'Lomé, Togo',
  // Identifiants admin (changer ces valeurs !)
  adminUser:  'admin',
  adminPass:  'TechPro@2025',
};

// Catégories de produits
const CATEGORIES = [
  { id: 'all',        label: 'Tous' },
  { id: 'workstation',label: 'Stations de travail' },
  { id: 'server',     label: 'Serveurs' },
  { id: 'network',    label: 'Réseau & Connectivité' },
  { id: 'display',    label: 'Écrans & Affichage' },
  { id: 'accessory',  label: 'Périphériques' },
];

// Catalogue produits — ajouter/modifier ici ou via le panel admin
let PRODUCTS = JSON.parse(localStorage.getItem('tp_products') || 'null') || [
  {
    id: 1,
    name: 'Dell Precision 5690',
    category: 'workstation',
    price: 2850000,
    badge: 'Bestseller',
    badgeColor: 'accent',
    desc: 'Station de travail mobile ultra-performante. Intel Core Ultra 9, RTX 5000 Ada, 64 Go RAM.',
    img: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80',
    specs: ['Intel Core Ultra 9 185H', 'NVIDIA RTX 5000 Ada', '64 Go DDR5', '2 To NVMe SSD', 'Écran OLED 16"'],
    featured: true,
  },
  {
    id: 2,
    name: 'HP ProLiant DL380 Gen11',
    category: 'server',
    price: 4200000,
    badge: 'Pro',
    badgeColor: 'blue',
    desc: 'Serveur rack 2U haute densité. Double processeur Intel Xeon Scalable, jusqu\'à 8 To RAM.',
    img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80',
    specs: ['2× Intel Xeon Silver 4516Y', 'Jusqu\'à 8 To DDR5', '24 emplacements SFF', 'iLO 6 intégré', 'Redondance PSU'],
    featured: true,
  },
  {
    id: 3,
    name: 'Cisco Catalyst 9300',
    category: 'network',
    price: 1950000,
    badge: 'Nouveau',
    badgeColor: 'green',
    desc: 'Switch manageable enterprise avec PoE+, VLAN avancé, SD-Access ready.',
    img: 'https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=600&q=80',
    specs: ['48 ports PoE+', 'Uplink 10G SFP+', 'VLAN & QoS', 'IOS-XE', 'Stack jusqu\'à 8 unités'],
    featured: true,
  },
  {
    id: 4,
    name: 'LG UltraFine 5K 27"',
    category: 'display',
    price: 890000,
    badge: '',
    badgeColor: '',
    desc: 'Écran 5K IPS, calibration usine, idéal pour la création et le développement.',
    img: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&q=80',
    specs: ['Résolution 5120×2880', 'IPS 600 nits', 'USB-C 96W', 'DCI-P3 99%', 'Thunderbolt 4'],
    featured: false,
  },
  {
    id: 5,
    name: 'Apple Mac Studio M4 Ultra',
    category: 'workstation',
    price: 3600000,
    badge: 'Premium',
    badgeColor: 'accent',
    desc: 'Puissance de calcul extrême. Puce M4 Ultra, 192 Go de mémoire unifiée, 8 To SSD.',
    img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80',
    specs: ['Apple M4 Ultra (32 cœurs)', '192 Go mémoire unifiée', '8 To SSD NVMe', 'GPU 80 cœurs', '6× Thunderbolt 5'],
    featured: true,
  },
  {
    id: 6,
    name: 'Logitech MX Master 3S Pro',
    category: 'accessory',
    price: 85000,
    badge: '',
    badgeColor: '',
    desc: 'Souris sans fil professionnelle. Molette MagSpeed, 8000 DPI, Bolt USB + Bluetooth.',
    img: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&q=80',
    specs: ['Capteur 8000 DPI', 'Molette MagSpeed', 'Multi-appareils (3)', 'Autonomie 70 jours', 'USB-C rapide'],
    featured: false,
  },
  {
    id: 7,
    name: 'Ubiquiti UniFi Dream Machine Pro',
    category: 'network',
    price: 620000,
    badge: '',
    badgeColor: '',
    desc: 'Routeur/firewall enterprise avec contrôleur UniFi intégré, IDS/IPS, 10G.',
    img: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&q=80',
    specs: ['10G SFP+', 'IDS/IPS intégré', 'Contrôleur UniFi', 'VPN site-à-site', '3,5 Gbps firewall'],
    featured: false,
  },
  {
    id: 8,
    name: 'Samsung Odyssey G9 Neo 49"',
    category: 'display',
    price: 1150000,
    badge: 'Gaming / Pro',
    badgeColor: 'blue',
    desc: 'Écran ultra-large incurvé QLED Mini LED. 5120×1440, 240Hz, parfait pour le multi-tâche.',
    img: 'https://images.unsplash.com/photo-1593640408182-31c228745748?w=600&q=80',
    specs: ['5120×1440 DQHD', 'QLED Mini LED', '240Hz 1ms', 'G-Sync/FreeSync', 'HDR 2000'],
    featured: false,
  },
];

// Sauvegarder en localStorage si pas encore fait
if (!localStorage.getItem('tp_products')) {
  localStorage.setItem('tp_products', JSON.stringify(PRODUCTS));
}

// Formater le prix en FCFA
function formatPrice(n) {
  return new Intl.NumberFormat('fr-FR').format(n) + ' FCFA';
}
