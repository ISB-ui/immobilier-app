# 🎨 Charte Graphique - Immobilier App

## Palette de Couleurs Officielle

### Couleurs Primaires
- **Vert Principal** : `#27ae60` - Actions positives, validations
- **Vert Clair** : `#2ecc71` - Hover, états actifs  
- **Vert Foncé** : `#1e8449` - Backgrounds sombres

### Couleurs Secondaires  
- **Jaune Principal** : `#f39c12` - Warnings, "En attente"
- **Jaune Clair** : `#f1c40f` - Highlights, accents
- **Jaune Foncé** : `#d68910` - Backgrounds sombres

### Couleurs Tertiaires
- **Rouge Principal** : `#e74c3c` - Danger, erreurs, refus
- **Rouge Clair** : `#ec7063` - Hover, accents
- **Rouge Foncé** : `#c0392b` - Backgrounds sombres

### Couleurs Neutres
- **Blanc** : `#ffffff` - Fond des composants
- **Gris Clair** : `#f8f9fa` - Fond des pages
- **Gris Moyen** : `#ecf0f1` - Bordures légères
- **Gris Texte** : `#333333` - Texte principal
- **Gris Border** : `#ddd` - Bordures

## Utilisation des Couleurs

### Par Statut
| Statut | Couleur | Code |
|--------|---------|------|
| ✅ Validée | Vert | `#27ae60` |
| ⏳ En attente | Jaune | `#f39c12` |
| ❌ Refusée | Rouge | `#e74c3c` |

### Par Type de Transaction
| Type | Couleur | Style |
|------|---------|-------|
| 🏠 Location | Gradient Vert | Vert clair à foncé |
| 🏢 Vente | Gradient Rouge | Rouge clair à foncé |

### Par Composant
| Composant | Couleur |
|-----------|---------|
| Bouttons principaux | Gradient Vert |
| Navigation | Bordure Vert |
| Headers | Gradient Vert |
| Badges de statut | Selon le statut |
| Badges de type | Selon le type |
| Accents | Jaune |
| Erreurs/Danger | Rouge |
| Succès | Vert |

## Fichier CSS Global

Le fichier `/styles.css` contient toutes les définitions de couleurs et les styles réutilisables :

```css
:root {
    /* Couleurs primaires */
    --vert-principal: #27ae60;
    --vert-clair: #2ecc71;
    --vert-fonce: #1e8449;
    
    /* Couleurs secondaires */
    --jaune-principal: #f39c12;
    --jaune-clair: #f1c40f;
    --jaune-fonce: #d68910;
    
    /* Couleurs tertiaires */
    --rouge-principal: #e74c3c;
    --rouge-clair: #ec7063;
    --rouge-fonce: #c0392b;
}
```

## Dégradés Recommandés

- **Primaire** : `linear-gradient(135deg, #27ae60 0%, #1e8449 100%)`
- **Secondaire** : `linear-gradient(135deg, #f39c12 0%, #d68910 100%)`
- **Danger** : `linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)`

## Référence Complète

Tous les fichiers HTML utilisent maintenant :
- ✅ `<link rel="stylesheet" href="/styles.css">`
- ✅ Variables CSS harmonisées
- ✅ Dégradés consistants
- ✅ Badges et badges de couleur appropriés
- ✅ Buttons avec la couleur verte primaire
- ✅ Navigation avec bordure verte

## Points Clés

1. **Harmonie visuelle** : Les trois couleurs (vert, jaune, rouge) sont utilisées cohéremment partout
2. **Accessibilité** : Contraste suffisant entre les couleurs et le texte blanc/noir
3. **Cohérence** : Tous les 9 pages utilisent la même palette
4. **Maintenabilité** : Les variables CSS centralisées permettent des modifications futures faciles

## À Retenir

- 🟢 **Vert** = Positif, valide, succès
- 🟡 **Jaune** = Attention, en attente, warning  
- 🔴 **Rouge** = Danger, refusé, erreur

---

**Dernière mise à jour** : 22 janvier 2026
