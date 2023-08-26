

https://user-images.githubusercontent.com/87017227/132104091-a304231a-4e62-4d05-a1d8-666fd3a83e19.mp4

# consoleJS

# Sozlash:

<p>Ushbu proyectni CLI</p>

```
git clone https://github.com/Humoyundeveloper/consoleJS.git
```

<p>Yoki shunchaki zip formatda yuklab olishingiz mumkin.</p>

# Foydalanish:

<p>Ushbu tegni head tegi ichiga joylashtiring</p>

```html
<script type="text/javascript" src="dist/consolejs.js"></script>
```

<p>So'ng, consoleJS dan foydalansangiz bo'ladi:</p>

```html
<script type="text/javascript">
  cjs.log("<17>Salom Dunyo</17>");
</script>
```

<p>Yuqoridagi kod 17px o'lchamdagi "Salom Dunyo" textini consolga chiqaradi. Syntaxi HTML nikiga o'xshash lekin teglar nomi faqat raqamlar bilan ifodalanadi.
 `console` obyectida mavjud bo'lgan metodlar `cjs` obyectida ham mavjud:
</p>

```html
<script type="text/javascript">
  cjs.log("<17>Salom Dunyo</17>");
  cjs.warn("<17>Salom Dunyo</17>");
  cjs.info("<17>Salom Dunyo</17>");
  cjs.error("<17>Salom Dunyo</17>");
</script>
```

<p>consoleJS ning yana bir hususiyati siz elementlarga `style` attributini ham berishingiz mumkin:</p>

```html
<script type="text/javascript">
  cjs.log("<20 style='color: green; background-color: yellow; text-shadow: 2px 3px 5px rgba(0, 0, 0, 0.4)'>Salom Dunyo</20><17 style='font-weight: bolder'> Salom!!!</17>");
</script>
```

<p>Istalgan stilni berishingiz mumkin!</p>

<p>Created By Humoyun</p>
