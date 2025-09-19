import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import PriceCalculator from '@/components/PriceCalculator';

const Index = () => {
  const [selectedMaterial, setSelectedMaterial] = useState<string>('');
  const [selectedFormat, setSelectedFormat] = useState<string>('');

  const services = [
    {
      icon: 'Printer',
      title: 'Цифровая печать',
      description: 'Высококачественная цифровая печать любых форматов',
      price: 'от 5₽'
    },
    {
      icon: 'FileText',
      title: 'Визитки',
      description: 'Профессиональные визитки с индивидуальным дизайном',
      price: 'от 300₽'
    },
    {
      icon: 'Bookmark',
      title: 'Брошюры',
      description: 'Рекламные брошюры и каталоги продукции',
      price: 'от 50₽'
    },
    {
      icon: 'Image',
      title: 'Фотопечать',
      description: 'Печать фотографий в любом размере',
      price: 'от 15₽'
    },
    {
      icon: 'CreditCard',
      title: 'Пластиковые карты',
      description: 'Дисконтные и бонусные карты из пластика',
      price: 'от 25₽'
    },
    {
      icon: 'Package',
      title: 'Упаковка',
      description: 'Картонная упаковка и коробки под заказ',
      price: 'от 80₽'
    }
  ];

  const materials = [
    { name: 'Бумага офисная 80г/м²', category: 'paper', available: true },
    { name: 'Мелованная бумага 115г/м²', category: 'paper', available: true },
    { name: 'Мелованная бумага 150г/м²', category: 'paper', available: true },
    { name: 'Картон 300г/м²', category: 'cardboard', available: true },
    { name: 'Самоклеящаяся пленка', category: 'vinyl', available: true },
    { name: 'Фотобумага глянцевая', category: 'photo', available: true },
    { name: 'Холст для постеров', category: 'canvas', available: false },
    { name: 'Пластик ПВХ 0.7мм', category: 'plastic', available: true }
  ];

  const formats = [
    { name: 'A4 (210×297 мм)', popular: true },
    { name: 'A3 (297×420 мм)', popular: true },
    { name: 'A2 (420×594 мм)', popular: false },
    { name: 'A1 (594×841 мм)', popular: false },
    { name: 'A0 (841×1189 мм)', popular: false },
    { name: 'Визитка (90×50 мм)', popular: true },
    { name: 'Евро флаер (99×210 мм)', popular: true },
    { name: 'Открытка (148×105 мм)', popular: true }
  ];

  const portfolio = [
    {
      title: 'Корпоративный каталог',
      category: 'Брошюры',
      image: '/img/ad702517-15ff-4738-b2e7-54163a56c3e6.jpg'
    },
    {
      title: 'Визитки премиум класса',
      category: 'Визитки',
      image: '/img/ad702517-15ff-4738-b2e7-54163a56c3e6.jpg'
    },
    {
      title: 'Рекламные листовки',
      category: 'Флаеры',
      image: '/img/ad702517-15ff-4738-b2e7-54163a56c3e6.jpg'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Printer" className="text-vibrant-orange" size={32} />
            <h1 className="text-2xl font-bold text-dark-grey">PRINTING CENTER</h1>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#services" className="text-medium-grey hover:text-vibrant-orange transition-colors">Услуги</a>
            <a href="#materials" className="text-medium-grey hover:text-vibrant-orange transition-colors">Материалы</a>
            <a href="#pricing" className="text-medium-grey hover:text-vibrant-orange transition-colors">Прайс</a>
            <a href="#portfolio" className="text-medium-grey hover:text-vibrant-orange transition-colors">Портфолио</a>
            <a href="#about" className="text-medium-grey hover:text-vibrant-orange transition-colors">О нас</a>
            <a href="#contacts" className="text-medium-grey hover:text-vibrant-orange transition-colors">Контакты</a>
          </nav>
          <Button className="bg-vibrant-orange hover:bg-vibrant-orange/90 text-white">
            Заказать печать
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-light-grey to-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h2 className="text-5xl font-bold text-dark-grey mb-6 leading-tight">
                Высококачественная печать <span className="text-vibrant-orange">для вашего бизнеса</span>
              </h2>
              <p className="text-xl text-medium-grey mb-8 leading-relaxed">
                Современное оборудование, широкий выбор материалов и форматов. 
                Быстрое выполнение заказов любой сложности.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-vibrant-orange hover:bg-vibrant-orange/90 text-white px-8">
                  <Icon name="Phone" className="mr-2" size={20} />
                  Оставить заявку
                </Button>
                <Button size="lg" variant="outline" className="border-modern-blue text-modern-blue hover:bg-modern-blue hover:text-white">
                  Посмотреть каталог
                </Button>
              </div>
            </div>
            <div className="relative animate-scale-in">
              <img 
                src="/img/ad702517-15ff-4738-b2e7-54163a56c3e6.jpg" 
                alt="Современное полиграфическое оборудование" 
                className="rounded-lg shadow-2xl w-full h-auto"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-dark-grey">Работаем 24/7</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-dark-grey mb-4">Наши услуги</h3>
            <p className="text-xl text-medium-grey max-w-3xl mx-auto">
              Предоставляем полный спектр полиграфических услуг для бизнеса и частных лиц
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 hover:border-vibrant-orange/20">
                <CardHeader>
                  <div className="w-12 h-12 bg-vibrant-orange/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon name={service.icon as any} className="text-vibrant-orange" size={24} />
                  </div>
                  <CardTitle className="text-xl text-dark-grey">{service.title}</CardTitle>
                  <CardDescription className="text-medium-grey">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-vibrant-orange">{service.price}</span>
                    <Button variant="outline" size="sm" className="border-modern-blue text-modern-blue hover:bg-modern-blue hover:text-white">
                      Подробнее
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Materials Catalog */}
      <section id="materials" className="py-20 bg-light-grey">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-dark-grey mb-4">Каталог материалов и форматов</h3>
            <p className="text-xl text-medium-grey max-w-3xl mx-auto">
              Выберите подходящий материал и формат для вашего проекта
            </p>
          </div>
          
          <Tabs defaultValue="materials" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="materials" className="text-lg">Материалы</TabsTrigger>
              <TabsTrigger value="formats" className="text-lg">Форматы</TabsTrigger>
            </TabsList>
            
            <TabsContent value="materials" className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {materials.map((material, index) => (
                  <Card 
                    key={index} 
                    className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                      selectedMaterial === material.name ? 'ring-2 ring-vibrant-orange border-vibrant-orange' : ''
                    } ${!material.available ? 'opacity-50' : ''}`}
                    onClick={() => material.available && setSelectedMaterial(material.name)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge 
                          variant={material.available ? 'default' : 'secondary'}
                          className={material.available ? 'bg-green-100 text-green-800' : ''}
                        >
                          {material.available ? 'В наличии' : 'Под заказ'}
                        </Badge>
                      </div>
                      <h4 className="font-medium text-dark-grey">{material.name}</h4>
                      <p className="text-sm text-medium-grey capitalize">{material.category}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="formats" className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {formats.map((format, index) => (
                  <Card 
                    key={index} 
                    className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                      selectedFormat === format.name ? 'ring-2 ring-vibrant-orange border-vibrant-orange' : ''
                    }`}
                    onClick={() => setSelectedFormat(format.name)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        {format.popular && (
                          <Badge className="bg-vibrant-orange text-white">
                            Популярный
                          </Badge>
                        )}
                      </div>
                      <h4 className="font-medium text-dark-grey">{format.name}</h4>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mt-12">
            <PriceCalculator 
              selectedMaterial={selectedMaterial} 
              selectedFormat={selectedFormat}
            />
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section id="portfolio" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-dark-grey mb-4">Наши работы</h3>
            <p className="text-xl text-medium-grey max-w-3xl mx-auto">
              Примеры выполненных проектов различной сложности
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {portfolio.map((item, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="aspect-video bg-light-grey overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <Badge className="bg-modern-blue/10 text-modern-blue mb-3">{item.category}</Badge>
                  <h4 className="text-xl font-semibold text-dark-grey">{item.title}</h4>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark-grey text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <Icon name="Printer" className="text-vibrant-orange" size={32} />
                <h3 className="text-xl font-bold">PRINTING CENTER</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Ваш надежный партнер в мире полиграфии. Качество, скорость, доступные цены.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Услуги</h4>
              <ul className="space-y-2 text-gray-300">
                <li>Цифровая печать</li>
                <li>Офсетная печать</li>
                <li>Широкоформатная печать</li>
                <li>Постпечатная обработка</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Контакты</h4>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center space-x-2">
                  <Icon name="Phone" size={16} />
                  <span>+7 (495) 123-45-67</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Icon name="Mail" size={16} />
                  <span>info@printcenter.ru</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Icon name="MapPin" size={16} />
                  <span>Москва, ул. Печатников, 15</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Режим работы</h4>
              <ul className="space-y-2 text-gray-300">
                <li>Пн-Пт: 8:00 - 20:00</li>
                <li>Сб-Вс: 10:00 - 18:00</li>
                <li className="text-vibrant-orange font-medium">Срочные заказы - 24/7</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Printing Center. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;