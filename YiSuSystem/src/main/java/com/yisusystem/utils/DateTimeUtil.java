package com.yisusystem.utils;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/**
 * 时间解析与格式化工具
 * @author liufuming
 */
public final class DateTimeUtil {
    private static final DateTimeFormatter DEFAULT_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    // 获取当前时间
    public static LocalDateTime now() {
        return LocalDateTime.now();
    }

    // 获取当前时间字符串
    public static String nowDateTimeStr() {
        return now().format(DEFAULT_FORMATTER);
    }

    // 格式化任意 LocalDateTime
    public static String format(LocalDateTime dateTime) {
        return dateTime.format(DEFAULT_FORMATTER);
    }

    // 解析字符串为 LocalDateTime
    public static LocalDateTime parse(String dateTimeStr) {
        return LocalDateTime.parse(dateTimeStr, DEFAULT_FORMATTER);
    }
}
