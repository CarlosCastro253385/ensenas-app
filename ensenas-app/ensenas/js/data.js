// Niveles, secciones y palabras. Cada palabra apunta a assets/signs/<f>.jpg
// Fotos: Diccionario de Lengua de Señas Mexicana (Manos con Voz)
const LV = [
  {
    n: "Abecedario",
    secs: [
      [
        { w: "A", f: "abecedario_a" },
        { w: "B", f: "abecedario_b" },
        { w: "C", f: "abecedario_c" },
        { w: "D", f: "abecedario_d" },
        { w: "E", f: "abecedario_e" },
        { w: "F", f: "abecedario_f" },
        { w: "G", f: "abecedario_g" }
      ],
      [
        { w: "H", f: "abecedario_h" },
        { w: "I", f: "abecedario_i" },
        { w: "J", f: "abecedario_j" },
        { w: "K", f: "abecedario_k" },
        { w: "L", f: "abecedario_l" },
        { w: "M", f: "abecedario_m" },
        { w: "N", f: "abecedario_n" }
      ],
      [
        { w: "Ñ", f: "abecedario_ny" },
        { w: "O", f: "abecedario_o" },
        { w: "P", f: "abecedario_p" },
        { w: "Q", f: "abecedario_q" },
        { w: "R", f: "abecedario_r" },
        { w: "S", f: "abecedario_s" }
      ],
      [
        { w: "T", f: "abecedario_t" },
        { w: "U", f: "abecedario_u" },
        { w: "V", f: "abecedario_v" },
        { w: "W", f: "abecedario_w" },
        { w: "X", f: "abecedario_x" },
        { w: "Y", f: "abecedario_y" },
        { w: "Z", f: "abecedario_z" }
      ]
    ]
  },
  {
    n: "Saludos",
    secs: [
      [
        { w: "Buenos días", f: "saludos_buenos_dias" },
        { w: "Buenas tardes", f: "saludos_buenas_tardes" },
        { w: "Buenas noches", f: "saludos_buenas_noches" },
        { w: "Adiós", f: "saludos_adios" }
      ],
      [
        { w: "Amigo", f: "saludos_amigo" },
        { w: "Amiga", f: "saludos_amiga" },
        { w: "Saludar", f: "saludos_saludar" },
        { w: "Favor", f: "saludos_favor" }
      ],
      [
        { w: "Ayudar", f: "saludos_ayudar" },
        { w: "Querer", f: "saludos_querer" },
        { w: "Invitar", f: "saludos_invitar" },
        { w: "Paz", f: "saludos_paz" }
      ],
      [
        { w: "Hoy", f: "saludos_hoy" },
        { w: "Mañana", f: "saludos_manyana" },
        { w: "Ayer", f: "saludos_ayer" },
        { w: "Ahora", f: "saludos_ahora" }
      ]
    ]
  },
  {
    n: "Colores",
    secs: [
      [
        { w: "Rojo", f: "colores_rojo_1" },
        { w: "Azul", f: "colores_azul" },
        { w: "Verde", f: "colores_verde" },
        { w: "Amarillo", f: "colores_amarillo" }
      ],
      [
        { w: "Naranja", f: "colores_naranja" },
        { w: "Rosa", f: "colores_rosa" },
        { w: "Morado", f: "colores_morado" },
        { w: "Café", f: "colores_cafe" }
      ],
      [
        { w: "Blanco", f: "colores_blanco" },
        { w: "Negro", f: "colores_negro" },
        { w: "Gris", f: "colores_gris" },
        { w: "Color", f: "colores_color" }
      ],
      [
        { w: "Claro", f: "colores_claro" },
        { w: "Oscuro", f: "colores_oscuro" },
        { w: "Azul rey", f: "colores_azul_rey" },
        { w: "Oro", f: "colores_oro" }
      ]
    ]
  },
  {
    n: "Comida",
    secs: [
      [
        { w: "Manzana", f: "comida_manzana" },
        { w: "Pera", f: "comida_pera" },
        { w: "Uva", f: "comida_uva" },
        { w: "Durazno", f: "comida_durazno" }
      ],
      [
        { w: "Piña", f: "comida_pinya" },
        { w: "Sandía", f: "comida_sandia" },
        { w: "Melón", f: "comida_melon" },
        { w: "Limón", f: "comida_limon_1" }
      ],
      [
        { w: "Tomate", f: "comida_tomate" },
        { w: "Papa", f: "comida_papa" },
        { w: "Cebolla", f: "comida_cebolla" },
        { w: "Maíz", f: "comida_maiz" }
      ],
      [
        { w: "Chile", f: "comida_chile" },
        { w: "Frijol", f: "comida_frijol" },
        { w: "Pollo", f: "comida_pollo" },
        { w: "Papaya", f: "comida_papaya" }
      ]
    ]
  },
  {
    n: "Animales",
    secs: [
      [
        { w: "Perro", f: "animales_perro" },
        { w: "Gato", f: "animales_gato" },
        { w: "Pez", f: "animales_pez" },
        { w: "Pato", f: "animales_pato" }
      ],
      [
        { w: "Vaca", f: "animales_vaca" },
        { w: "Caballo", f: "animales_caballo" },
        { w: "Tortuga", f: "animales_tortuga" },
        { w: "Rana", f: "animales_rana" }
      ],
      [
        { w: "Conejo", f: "animales_conejo" },
        { w: "Mono", f: "animales_mono" },
        { w: "León", f: "animales_leon" },
        { w: "Oso", f: "animales_oso" }
      ],
      [
        { w: "Elefante", f: "animales_elefante" },
        { w: "Lobo", f: "animales_lobo" },
        { w: "Abeja", f: "animales_abeja" },
        { w: "Tigre", f: "animales_tigre" }
      ]
    ]
  },
  {
    n: "Familia",
    secs: [
      [
        { w: "Mamá", f: "familia_mama" },
        { w: "Papá", f: "familia_papa" },
        { w: "Hijo", f: "familia_hijo" },
        { w: "Madre", f: "familia_madre" }
      ],
      [
        { w: "Abuela", f: "familia_abuela" },
        { w: "Abuelo", f: "familia_abuelo" },
        { w: "Niño", f: "familia_ninyo" },
        { w: "Niña", f: "familia_ninya" }
      ],
      [
        { w: "Tía", f: "familia_tia" },
        { w: "Primo", f: "familia_primo" },
        { w: "Sobrino", f: "familia_sobrino" },
        { w: "Nieto", f: "familia_nieto" }
      ],
      [
        { w: "Madrina", f: "familia_madrina" },
        { w: "Padrino", f: "familia_padrino" },
        { w: "Novia", f: "familia_novia" },
        { w: "Novio", f: "familia_novio" }
      ]
    ]
  }
];