import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface PriceCalculatorProps {
  selectedMaterial?: string;
  selectedFormat?: string;
}

const PriceCalculator = ({ selectedMaterial, selectedFormat }: PriceCalculatorProps) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [material, setMaterial] = useState<string>(selectedMaterial || '');
  const [format, setFormat] = useState<string>(selectedFormat || '');
  const [copies, setCopies] = useState<number>(1);
  const [finishing, setFinishing] = useState<string>('none');
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [isUrgent, setIsUrgent] = useState<boolean>(false);

  const materials = [
    { name: 'Бумага офисная 80г/м²', basePrice: 2, category: 'paper' },
    { name: 'Мелованная бумага 115г/м²', basePrice: 4, category: 'paper' },
    { name: 'Мелованная бумага 150г/м²', basePrice: 6, category: 'paper' },
    { name: 'Картон 300г/м²', basePrice: 12, category: 'cardboard' },
    { name: 'Самоклеящаяся пленка', basePrice: 15, category: 'vinyl' },
    { name: 'Фотобумага глянцевая', basePrice: 8, category: 'photo' },
    { name: 'Пластик ПВХ 0.7мм', basePrice: 25, category: 'plastic' }
  ];

  const formats = [
    { name: 'A4 (210×297 мм)', multiplier: 1, popular: true },
    { name: 'A3 (297×420 мм)', multiplier: 2, popular: true },
    { name: 'A2 (420×594 мм)', multiplier: 4, popular: false },
    { name: 'A1 (594×841 мм)', multiplier: 8, popular: false },
    { name: 'A0 (841×1189 мм)', multiplier: 16, popular: false },
    { name: 'Визитка (90×50 мм)', multiplier: 0.2, popular: true },
    { name: 'Евро флаер (99×210 мм)', multiplier: 0.5, popular: true },
    { name: 'Открытка (148×105 мм)', multiplier: 0.6, popular: true }
  ];

  const finishingOptions = [
    { name: 'none', label: 'Без отделки', price: 0 },
    { name: 'lamination', label: 'Ламинирование', price: 5 },
    { name: 'uv', label: 'УФ-лакирование', price: 8 },
    { name: 'embossing', label: 'Тиснение', price: 12 },
    { name: 'cutting', label: 'Фигурная резка', price: 3 }
  ];

  const quantityDiscounts = [
    { min: 1, max: 49, discount: 0 },
    { min: 50, max: 99, discount: 0.05 },
    { min: 100, max: 499, discount: 0.1 },
    { min: 500, max: 999, discount: 0.15 },
    { min: 1000, max: Infinity, discount: 0.2 }
  ];

  useEffect(() => {
    if (selectedMaterial) setMaterial(selectedMaterial);
  }, [selectedMaterial]);

  useEffect(() => {
    if (selectedFormat) setFormat(selectedFormat);
  }, [selectedFormat]);

  useEffect(() => {
    calculatePrice();
  }, [material, format, quantity, copies, finishing, isUrgent]);

  const calculatePrice = () => {
    if (!material || !format || quantity <= 0) {
      setTotalPrice(0);
      return;
    }

    const selectedMaterialData = materials.find(m => m.name === material);
    const selectedFormatData = formats.find(f => f.name === format);
    const selectedFinishing = finishingOptions.find(f => f.name === finishing);

    if (!selectedMaterialData || !selectedFormatData || !selectedFinishing) {
      setTotalPrice(0);
      return;
    }

    // Базовая стоимость за единицу
    let basePrice = selectedMaterialData.basePrice * selectedFormatData.multiplier;
    
    // Добавляем стоимость отделки
    basePrice += selectedFinishing.price;

    // Общая стоимость до скидок
    let totalBeforeDiscount = basePrice * quantity * copies;

    // Применяем скидку за тираж
    const discount = quantityDiscounts.find(d => 
      (quantity * copies) >= d.min && (quantity * copies) <= d.max
    )?.discount || 0;

    totalBeforeDiscount *= (1 - discount);

    // Срочность увеличивает стоимость на 50%
    if (isUrgent) {
      totalBeforeDiscount *= 1.5;
    }

    setTotalPrice(Math.round(totalBeforeDiscount));
  };

  const getDiscount = () => {
    const totalCopies = quantity * copies;
    return quantityDiscounts.find(d => 
      totalCopies >= d.min && totalCopies <= d.max
    )?.discount || 0;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl border-2">
      <CardHeader className="bg-gradient-to-r from-vibrant-orange to-vibrant-orange/80 text-white">
        <CardTitle className="flex items-center text-2xl">
          <Icon name="Calculator" className="mr-3" size={28} />
          Калькулятор стоимости печати
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Выбор материала */}
        <div className="space-y-2">
          <Label htmlFor="material" className="text-base font-medium">Материал</Label>
          <Select value={material} onValueChange={setMaterial}>
            <SelectTrigger>
              <SelectValue placeholder="Выберите материал" />
            </SelectTrigger>
            <SelectContent>
              {materials.map((mat, index) => (
                <SelectItem key={index} value={mat.name}>
                  <div className="flex items-center justify-between w-full">
                    <span>{mat.name}</span>
                    <Badge variant="outline" className="ml-2">
                      {formatPrice(mat.basePrice)}
                    </Badge>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Выбор формата */}
        <div className="space-y-2">
          <Label htmlFor="format" className="text-base font-medium">Формат</Label>
          <Select value={format} onValueChange={setFormat}>
            <SelectTrigger>
              <SelectValue placeholder="Выберите формат" />
            </SelectTrigger>
            <SelectContent>
              {formats.map((fmt, index) => (
                <SelectItem key={index} value={fmt.name}>
                  <div className="flex items-center justify-between w-full">
                    <span>{fmt.name}</span>
                    {fmt.popular && (
                      <Badge className="ml-2 bg-vibrant-orange text-white">
                        Популярный
                      </Badge>
                    )}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Количество и тираж */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="quantity" className="text-base font-medium">Количество листов</Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              className="text-center"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="copies" className="text-base font-medium">Экземпляров</Label>
            <Input
              id="copies"
              type="number"
              min="1"
              value={copies}
              onChange={(e) => setCopies(parseInt(e.target.value) || 1)}
              className="text-center"
            />
          </div>
        </div>

        {/* Отделка */}
        <div className="space-y-2">
          <Label htmlFor="finishing" className="text-base font-medium">Дополнительная отделка</Label>
          <Select value={finishing} onValueChange={setFinishing}>
            <SelectTrigger>
              <SelectValue placeholder="Выберите отделку" />
            </SelectTrigger>
            <SelectContent>
              {finishingOptions.map((finish, index) => (
                <SelectItem key={index} value={finish.name}>
                  <div className="flex items-center justify-between w-full">
                    <span>{finish.label}</span>
                    {finish.price > 0 && (
                      <Badge variant="outline" className="ml-2">
                        +{formatPrice(finish.price)}
                      </Badge>
                    )}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Срочность */}
        <div className="flex items-center justify-between p-4 bg-light-grey rounded-lg">
          <div className="flex items-center space-x-3">
            <Icon name="Clock" className="text-vibrant-orange" size={20} />
            <div>
              <p className="font-medium">Срочное выполнение (до 2 часов)</p>
              <p className="text-sm text-medium-grey">+50% к стоимости</p>
            </div>
          </div>
          <Button
            variant={isUrgent ? "default" : "outline"}
            onClick={() => setIsUrgent(!isUrgent)}
            className={isUrgent ? "bg-vibrant-orange hover:bg-vibrant-orange/90" : ""}
          >
            {isUrgent ? "Включено" : "Добавить"}
          </Button>
        </div>

        <Separator />

        {/* Детализация расчета */}
        {totalPrice > 0 && (
          <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-dark-grey">Детализация расчета:</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Общий тираж:</span>
                <span className="font-medium">{quantity * copies} шт.</span>
              </div>
              {getDiscount() > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Скидка за тираж:</span>
                  <span className="font-medium">-{(getDiscount() * 100).toFixed(0)}%</span>
                </div>
              )}
              {isUrgent && (
                <div className="flex justify-between text-vibrant-orange">
                  <span>Срочность:</span>
                  <span className="font-medium">+50%</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Итоговая стоимость */}
        <div className="bg-gradient-to-r from-vibrant-orange/10 to-modern-blue/10 p-6 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-medium text-dark-grey">Итоговая стоимость:</p>
              {totalPrice > 0 && (
                <p className="text-sm text-medium-grey">
                  ~{formatPrice(totalPrice / (quantity * copies))} за штуку
                </p>
              )}
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-vibrant-orange">
                {totalPrice > 0 ? formatPrice(totalPrice) : '—'}
              </p>
            </div>
          </div>
        </div>

        {/* Кнопки действий */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            className="flex-1 bg-vibrant-orange hover:bg-vibrant-orange/90 text-white h-12"
            disabled={totalPrice === 0}
          >
            <Icon name="ShoppingCart" className="mr-2" size={20} />
            Заказать печать
          </Button>
          <Button 
            variant="outline" 
            className="flex-1 border-modern-blue text-modern-blue hover:bg-modern-blue hover:text-white h-12"
            disabled={totalPrice === 0}
          >
            <Icon name="FileText" className="mr-2" size={20} />
            Сохранить расчет
          </Button>
        </div>

        {/* Дополнительная информация */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-start space-x-3">
            <Icon name="Info" className="text-modern-blue mt-0.5" size={20} />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">Обратите внимание:</p>
              <ul className="space-y-1 text-blue-700">
                <li>• Цены указаны для односторонней печати</li>
                <li>• Скидки применяются автоматически при увеличении тиража</li>
                <li>• Точная стоимость рассчитывается после анализа макета</li>
                <li>• Доставка по Москве от 300₽, самовывоз бесплатно</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PriceCalculator;