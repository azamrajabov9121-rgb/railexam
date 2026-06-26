const text = "Ikki izli liniya peregonlaridagi to‘g‘ri uchastkalarda yo‘l o‘qlari o‘rtasidagi masofa quyidagidan kam bo‘lmasligi shart | 3100 mm | 4100 mm | 3800 mm | 4000 mm";

const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=uz&tl=ru&dt=t&q=${encodeURIComponent(text)}`;

fetch(url)
  .then(res => res.json())
  .then(data => {
    console.log('API Response Structure:', JSON.stringify(data.slice(0, 1)));
    const translated = data[0].map(x => x[0]).join('');
    console.log('Full translated string:', translated);
    const parts = translated.split(/\s*\|\s*/);
    console.log('Split parts:', parts);
  })
  .catch(err => console.error(err));
