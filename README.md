# Book Rental App

Bu proje, kullanıcıların kitap kiralayabileceği ve yönetebileceği bir platformdur. Angular ile frontend kısmı ve Java Spring Boot ile backend kısmı geliştirilmiştir.

## Özellikler

- Kullanıcılar, sisteme kaydolarak kitapları kiralayabilir ve iade edebilir.
- Her kitap sadece bir kullanıcı tarafından kiralanabilir.
- Kullanıcılardan kiralama süresince ücret alınır.
- Admin paneli üzerinden kitap ekleme, düzenleme ve güncelleme işlemleri yapılabilir.
- Kullanıcılar sistemden banlanabilir.

## Projeyi Çalıştırma

### Angular Frontend

1. Terminalde proje dizinine gidin.
2. Aşağıdaki komutu çalıştırarak Angular projesini başlatın:

```bash
npm run start
```

3. Angular projesi varsayılan olarak 3500 portunda ayağa kalkacaktır.

### Java Spring Boot Backend

1. VS Code editöründe proje dizinini açın.
2. Debug sekmesine geçin ve F5 tuşuna basarak Spring Boot projesini çalıştırın.

Spring Boot uygulaması varsayılan olarak 3000 portunda ayağa kalkacaktır.

3. Spring Boot uygulamasının çalışması için application.properties dosyasına MongoDB URI ve MongoDB veritabanı bilgilerini ekleyin.

Örnek application.properties dosyası:

```bash
spring.application.name=bookrental
spring.data.mongodb.uri=mongodb+srv://username:password@cluster0.7sbmg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
spring.data.mongodb.database=bookrental
server.port=3000
```

Yukarıdaki gibi spring.data.mongodb.uri özelliğine MongoDB URI'nizi ve veritabanı adını ekleyin.

Projenin çalışması için MongoDB'ye ihtiyaç duyulacaktır. Varsayılan olarak kendi MongoDB Url'im üzerinde MongoDB çalıştığını varsaydım. Kendi MongoDB URI'nizi kullanarak uygun şekilde güncelleyin.


## Kullanıcılar ve Yetkiler

- Admin:
-- Kullanıcı adı: admin
-- Şifre: admin123
-- Admin paneline erişim sağlar, kitap ekleme, düzenleme ve kullanıcı banlama gibi işlemleri yapabilir.

- Kullanıcı:
-- Sisteme kaydolma ve kitap kiralamaya erişim sağlar.

## Teknolojiler
- Angular
- Java Spring Boot
- MongoDB

## Geliştirme Ortamı

- Angular: RxJS, PrimeNG
- Spring Boot: Java, Maven
- MongoDB: MongoDB Community Server

## Katkıda Bulunma

Herhangi bir hata bulursanız veya iyileştirme önerileriniz varsa lütfen bir Issue oluşturun veya bir Pull Request gönderin.

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Daha fazla bilgi için [LICENSE](./LICENSE) dosyasına bakın.
