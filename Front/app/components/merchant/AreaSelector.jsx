import React, { useState, useEffect } from "react";
import { regionData } from "element-china-area-data";
import CustomSelect from "./CustomSelect";

// 直辖市列表
const MUNICIPALITIES = ["北京市", "上海市", "天津市", "重庆市"];

export default function AreaSelector({
  province,
  city,
  district,
  onChange,
}) {
  const [selectedProvince, setSelectedProvince] = useState(province);
  const [selectedCity, setSelectedCity] = useState(city);
  const [selectedDistrict, setSelectedDistrict] = useState(district);

  // 获取省份列表
  const provinces = regionData;

  // 获取城市列表
  const [cities, setCities] = useState([]);

  // 获取区域列表
  const [districts, setDistricts] = useState([]);

  // 判断是否为直辖市
  const isMunicipality = (provinceName) => {
    return MUNICIPALITIES.includes(provinceName);
  };

  // 初始化城市和区域列表
  useEffect(() => {
    if (selectedProvince) {
      const provinceItem = provinces.find(
        (p) => p.label === selectedProvince,
      );
      if (provinceItem && provinceItem.children) {
        setCities(provinceItem.children);

        if (selectedCity) {
          const cityItem = provinceItem.children.find(
            (c) => c.label === selectedCity,
          );
          if (cityItem && cityItem.children) {
            setDistricts(cityItem.children);
          }
        }
      }
    }
  }, [selectedProvince, selectedCity]);

  useEffect(() => {
    setSelectedProvince(province);
    setSelectedCity(city);
    setSelectedDistrict(district);
  }, [province, city, district]);

  const handleProvinceChange = (value) => {
    setSelectedProvince(value);
    setSelectedDistrict("");

    // 更新城市列表
    const provinceItem = provinces.find(
      (p) => p.label === value,
    );
    if (provinceItem && provinceItem.children) {
      setCities(provinceItem.children);

      // 如果是直辖市，自动选择第一个城市（通常是市辖区）
      if (isMunicipality(value)) {
        const firstCity = provinceItem.children[0];
        if (firstCity) {
          setSelectedCity(firstCity.label);
          // 自动加载区域列表
          if (firstCity.children) {
            setDistricts(firstCity.children);
          } else {
            setDistricts([]);
          }
          // 通知父组件
          onChange(value, firstCity.label, "");
          return;
        }
      }
    } else {
      setCities([]);
    }

    // 非直辖市，清空城市选择
    setSelectedCity("");
    setDistricts([]);
    onChange(value, "", "");
  };

  const handleCityChange = (value) => {
    if (!value) return; // 防止选择placeholder

    setSelectedCity(value);
    setSelectedDistrict("");

    // 更新区域列表
    const provinceItem = provinces.find(
      (p) => p.label === selectedProvince,
    );
    if (provinceItem && provinceItem.children) {
      const cityItem = provinceItem.children.find(
        (c) => c.label === value,
      );
      if (cityItem && cityItem.children) {
        setDistricts(cityItem.children);
      } else {
        setDistricts([]);
      }
    }

    // 通知父组件
    onChange(selectedProvince, value, "");
  };

  const handleDistrictChange = (value) => {
    if (!value) return; // 防止选择placeholder

    setSelectedDistrict(value);

    // 通知父组件
    onChange(selectedProvince, selectedCity, value);
  };

  // 转换为 CustomSelect 需要的格式
  const provinceOptions = provinces.map((p) => ({
    value: p.label,
    label: p.label,
  }));
  const cityOptions = cities.map((c) => ({
    value: c.label,
    label: c.label,
  }));
  const districtOptions = districts.map((d) => ({
    value: d.label,
    label: d.label,
  }));

  return (
    <div className="grid grid-cols-3 gap-4">
      {/* Province Select */}
      <CustomSelect
        value={selectedProvince}
        onChange={handleProvinceChange}
        options={provinceOptions}
        placeholder="请选择省份"
        label="省份"
        required
      />

      {/* City Select */}
      <CustomSelect
        value={selectedCity}
        onChange={handleCityChange}
        options={cityOptions}
        placeholder={
          isMunicipality(selectedProvince)
            ? selectedProvince
            : "请选择城市"
        }
        label="城市"
        required
        disabled={
          !selectedProvince || isMunicipality(selectedProvince)
        }
      />

      {/* District Select */}
      <CustomSelect
        value={selectedDistrict}
        onChange={handleDistrictChange}
        options={districtOptions}
        placeholder="请选择区域"
        label="区域"
        required
        disabled={!selectedCity}
      />
    </div>
  );
}